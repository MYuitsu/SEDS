my-emergency-app/
├── angular.json
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── assets/
    │   ├── data/
    │   │   └── mock-emergency-patients.bundle.json    // File JSON FHIR mock
    │   └── images/                                     // Hình ảnh, icon, v.v.
    ├── environments/                                   // Cấu hình môi trường (dev, prod)
    │   ├── environment.ts
    │   └── environment.prod.ts
    ├── app/
    │   ├── app.config.ts           // Cấu hình router, providers, bootstrap (standalone)
    │   ├── app.component.ts        // Root component
    │   ├── app.routes.ts           // Định nghĩa các route chính (Dashboard, Patient Details)
    │   ├── core/                   // Các thành phần "lõi" của ứng dụng
    │   │   ├── interceptors/
    │   │   │   └── http.interceptor.ts     // Xử lý HTTP request/response toàn cục (token, lỗi,…)
    │   │   ├── guards/
    │   │   │   └── auth.guard.ts             // Bảo vệ route (nếu có phân quyền)
    │   │   ├── models/
    │   │   │   └── fhir.models.ts            // Định nghĩa interface, model cho dữ liệu HL7 FHIR
    │   │   ├── services/
    │   │   │   ├── fhir.service.ts           // Service xử lý, load và parse dữ liệu HL7 FHIR
    │   │   │   ├── api.service.ts            // Service giao tiếp với backend (nếu cần)
    │   │   │   └── logger.service.ts         // Service ghi log và xử lý lỗi
    │   │   ├── utils/
    │   │   │   ├── constants.ts              // Các hằng số dùng chung (endpoint, mã code,…)
    │   │   │   └── helpers.ts                // Các hàm tiện ích, helper functions
    │   │   └── error-handlers/
    │   │       └── global-error-handler.ts   // Xử lý lỗi toàn cục của ứng dụng
    │   ├── features/               // Các tính năng chính của ứng dụng
    │   │   ├── dashboard/          // Màn hình Dashboard – hiển thị danh sách bệnh nhân cấp cứu
    │   │   │   ├── dashboard.component.ts
    │   │   │   ├── dashboard.component.html
    │   │   │   └── dashboard.component.scss
    │   │   └── patient-details/    // Màn hình Chi tiết bệnh nhân – hiển thị thông tin cấp cứu cần thiết
    │   │       ├── patient-details.component.ts
    │   │       ├── patient-details.component.html
    │   │       └── patient-details.component.scss
    │   ├── shared/                 // Các thành phần giao diện dùng chung (reusable UI components)
    │   │   ├── components/
    │   │   │   ├── ui-card/        // Component hiển thị thông tin dạng card (ví dụ: thông tin bệnh nhân)
    │   │   │   │   ├── ui-card.component.ts
    │   │   │   │   ├── ui-card.component.html
    │   │   │   │   └── ui-card.component.scss
    │   │   │   ├── ui-button/      // Component button tùy biến (primary, secondary,…)
    │   │   │   │   ├── ui-button.component.ts
    │   │   │   │   ├── ui-button.component.html
    │   │   │   │   └── ui-button.component.scss
    │   │   │   └── ui-modal/       // Component modal (popup) dùng chung cho thông báo, cảnh báo
    │   │   │       ├── ui-modal.component.ts
    │   │   │       ├── ui-modal.component.html
    │   │   │       └── ui-modal.component.scss
    │   │   ├── directives/         // Các directive tái sử dụng (highlight, tooltip,…)
    │   │   │   ├── highlight.directive.ts
    │   │   │   └── tooltip.directive.ts
    │   │   ├── pipes/              // Các pipe dùng chung (định dạng ngày, chuyển đổi chữ,…)
    │   │   │   ├── format-date.pipe.ts
    │   │   │   └── uppercase.pipe.ts
    │   │   └── models/             // (Tùy chọn) Các interface hay kiểu dữ liệu dùng chung cho UI
    │   │       └── shared.models.ts
    │   └── app.module.ts           // (Tùy chọn) Nếu bạn vẫn dùng mô hình NgModule, có thể bỏ nếu hoàn toàn chuyển sang standalone components
    └── styles.scss                 // Global styles, theme Angular Material, v.v.
