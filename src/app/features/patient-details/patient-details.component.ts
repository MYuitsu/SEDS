import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FhirService } from '../../core/services/fhir.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-patient-details',
  standalone: true,
   imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  patient: any;

  constructor(private route: ActivatedRoute, private fhirService: FhirService) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.fhirService.getPatientById(patientId).subscribe((data) => {
        this.patient = data;
      });
    }
  }

  onCallSupport(): void {
    // Logic gọi hỗ trợ khẩn cấp
    console.log('Calling support...');
  }

  onConfirmIntervention(): void {
    // Logic xác nhận can thiệp
    console.log('Intervention confirmed.');
  }

  onAddQuickNote(): void {
    // Logic thêm ghi chú nhanh
    console.log('Quick note added.');
  }
}
