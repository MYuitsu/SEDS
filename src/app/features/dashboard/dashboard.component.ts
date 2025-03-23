import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FhirService } from '../../core/services/fhir.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  patients: any[] = [];

  constructor(private fhirService: FhirService, private router: Router) {}

  ngOnInit(): void {
    this.fhirService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  openPatientDetails(patientId: string): void {
    this.router.navigate(['/patient-details', patientId]);
  }
}
