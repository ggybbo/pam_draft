import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { LockModule } from 'app/main/pages/authentication/lock/lock.module';
import { ComingSoonModule } from 'app/main/pages/coming-soon/coming-soon.module';
import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
import { MaintenanceModule } from 'app/main/pages/maintenance/maintenence.module';
import { PricingModule } from 'app/main/pages/pricing/pricing.module';
import { ProfileModule } from 'app/main/pages/profile/profile.module';
import { FaqModule } from 'app/main/pages/faq/faq.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        LockModule,

        // Coming-soon
        ComingSoonModule,

        // Errors
        Error404Module,
        Error500Module,
        
        // Maintenance
        MaintenanceModule,

        // Pricing
        PricingModule,

        // Profile
        ProfileModule,

        // Faq
        FaqModule
    ]
})
export class PagesModule
{

}
