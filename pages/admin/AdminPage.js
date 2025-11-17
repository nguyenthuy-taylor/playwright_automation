import { BasePage } from '../BasePage.js';
import { SidebarComponent } from '../components/SidebarComponent.js';
import { UserManagementPage } from './subpages/UserManagementPage.js';
import { HeaderComponent } from '../../pages/components/HeaderComponent.js';
import { WorkShiftsPage } from '../admin/subpages/jobPage/WorkShiftsPage.js';
import headerOptions from '../../testData/headerOptions.json' assert {type: 'json'}

export class AdminPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarComponent(page);
        this.headerComponent = new HeaderComponent(page);
        this.userManagementDropdown = page.locator('.oxd-topbar-body-nav-tab-item:has-text("User Management")');
        this.userManagementOptions = page.locator('.oxd-dropdown-menu li a:has-text("Users")');
    }

    async goToUserManagement() {
        await this.sidebar.goToAdmin();
        await this.selectCustomDropdown(this.userManagementDropdown, this.userManagementOptions, 'Users')
        await this.notificationHelper.waitForLoadingFired();
        return new UserManagementPage(this.page);
    }
    async goToWorkShift() {
        await this.sidebar.goToAdmin();
        await this.headerComponent.goToMenuOption('Job', headerOptions.JOB.WORK_SHIFTS);
        return new WorkShiftsPage(this.page);
    }
}