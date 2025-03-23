import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  vitalSigns: {
    heartRate: number;
    bpSystolic: number;
    bpDiastolic: number;
    spO2: number;
    temperature: number;
    respiratoryRate: number;
  };
  allergy?: string;
  medication?: string;
  clinicalImpression?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  private bundleUrl = 'assets/data/mock-emergency-patients.bundle.json';

  constructor(private http: HttpClient) {}

  /**
   * Load file JSON FHIR và parse thành danh sách bệnh nhân.
   */
  getPatients(): Observable<Patient[]> {
    return this.http.get<any>(this.bundleUrl).pipe(
      map(bundle => {
        const patientMap: { [id: string]: Patient } = {};

        // Xử lý tất cả các resource trong bundle.entry
        if (bundle && Array.isArray(bundle.entry)) {
          // Đầu tiên, lấy tất cả các resource Patient
          bundle.entry.forEach((entry: any) => {
            const resource = entry.resource;
            if (resource.resourceType === 'Patient') {
              // Tính tuổi dựa trên birthDate
              const birthDate = resource.birthDate ? new Date(resource.birthDate) : new Date();
              const age = new Date().getFullYear() - birthDate.getFullYear();
              const name =
                resource.name && resource.name.length > 0
                  ? `${resource.name[0].given.join(' ')} ${resource.name[0].family}`
                  : 'Unknown';
              patientMap[resource.id] = {
                id: resource.id,
                name,
                age,
                gender: resource.gender,
                condition: '',
                vitalSigns: {
                  heartRate: 0,
                  bpSystolic: 0,
                  bpDiastolic: 0,
                  spO2: 0,
                  temperature: 0,
                  respiratoryRate: 0
                },
                allergy: '',
                medication: '',
                clinicalImpression: ''
              };
            }
          });

          // Sau đó, duyệt các resource khác và gán thông tin vào patientMap
          bundle.entry.forEach((entry: any) => {
            const resource = entry.resource;
            if (!resource) { return; }

            // Condition: Chẩn đoán
            if (resource.resourceType === 'Condition' && resource.subject && resource.subject.reference) {
              const patientId = resource.subject.reference.split('/')[1];
              if (patientMap[patientId] && resource.code?.coding?.length) {
                patientMap[patientId].condition = resource.code.coding[0].display;
              }
            }

            // Observation: Vital Signs
            if (resource.resourceType === 'Observation' && resource.subject && resource.subject.reference) {
              const patientId = resource.subject.reference.split('/')[1];
              if (patientMap[patientId] && resource.code?.coding?.length) {
                const coding = resource.code.coding[0];
                const value = resource.valueQuantity ? resource.valueQuantity.value : 0;
                switch (coding.code) {
                  case '8867-4': // Heart rate
                    patientMap[patientId].vitalSigns.heartRate = value;
                    break;
                  case '85354-9': // Blood pressure panel
                    if (resource.component && Array.isArray(resource.component)) {
                      resource.component.forEach((comp: any) => {
                        if (comp.code?.coding?.length) {
                          const compCode = comp.code.coding[0].code;
                          if (compCode === '8480-6') {
                            patientMap[patientId].vitalSigns.bpSystolic = comp.valueQuantity.value;
                          } else if (compCode === '8462-4') {
                            patientMap[patientId].vitalSigns.bpDiastolic = comp.valueQuantity.value;
                          }
                        }
                      });
                    }
                    break;
                  case '59408-5': // SpO2
                    patientMap[patientId].vitalSigns.spO2 = value;
                    break;
                  case '8310-5': // Temperature
                    patientMap[patientId].vitalSigns.temperature = value;
                    break;
                  case '9279-1': // Respiratory rate
                    patientMap[patientId].vitalSigns.respiratoryRate = value;
                    break;
                  default:
                    break;
                }
              }
            }

            // AllergyIntolerance: Dị ứng
            if (resource.resourceType === 'AllergyIntolerance' && resource.patient && resource.patient.reference) {
              const patientId = resource.patient.reference.split('/')[1];
              if (patientMap[patientId] && resource.code?.coding?.length) {
                patientMap[patientId].allergy = resource.code.coding[0].display;
              }
            }

            // MedicationStatement: Thuốc đang dùng
            if (resource.resourceType === 'MedicationStatement' && resource.subject && resource.subject.reference) {
              const patientId = resource.subject.reference.split('/')[1];
              if (patientMap[patientId] && resource.medicationCodeableConcept?.coding?.length) {
                patientMap[patientId].medication = resource.medicationCodeableConcept.coding[0].display;
              }
            }

            // ClinicalImpression: Ghi chú lâm sàng
            if (resource.resourceType === 'ClinicalImpression' && resource.subject && resource.subject.reference) {
              const patientId = resource.subject.reference.split('/')[1];
              if (patientMap[patientId] && resource.description) {
                patientMap[patientId].clinicalImpression = resource.description;
              }
            }
          });
        }

        // Trả về danh sách bệnh nhân dưới dạng mảng
        return Object.values(patientMap);
      })
    );
  }

  /**
   * Lấy thông tin chi tiết của một bệnh nhân dựa theo ID.
   */
  getPatientById(patientId: string): Observable<Patient> {
    return this.getPatients().pipe(
      map(patients => {
        const patient = patients.find(patient => patient.id === patientId);
        if (!patient) {
          throw new Error(`Patient with id ${patientId} not found`);
        }
        return patient;
      })
    );
  }
}
