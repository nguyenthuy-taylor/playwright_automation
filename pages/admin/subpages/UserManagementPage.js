import { BasePage } from '../../BasePage.js';

export class UserManagementPage extends BasePage {
    constructor(page) {
        super(page);
        this.addButton = page.locator('button:has-text("Add")');
        this.formTitle = page.locator('.orangehrm-background-container h6:has-text("Add User")');
        this.userRoleDropdown = page.locator("//label[normalize-space()='User Role']/parent::div/following-sibling::div/div");
        this.userRoleDropdownItems = page.locator("//label[normalize-space()='User Role']/parent::div/following-sibling::div/div/div[@role='listbox']/div/span");
        this.employeeNameTextbox = page.locator("//label[normalize-space()='Employee Name']/parent::div/following-sibling::div//input");
        this.suggestedItems = page.locator('div.oxd-autocomplete-dropdown>div>span');
        this.searchButton = page.locator('button.orangehrm-left-space');
        this.rowList = page.locator('div.oxd-table-card');

        this.addButton = page.locator("//button[normalize-space()='Add']");
        this.addUserUserRoleDropdown = page.locator("//label[normalize-space()='User Role']/parent::div/following-sibling::div/div")
        this.addUserUserRoleDropdownItems = page.locator("//label[normalize-space()='User Role']/parent::div/following-sibling::div/div/div[@role='listbox']/div/span")
        this.addUserStatusDropdown = page.locator("//label[normalize-space()='Status']/parent::div/following-sibling::div/div")
        this.addUserStatusDropdownItems = page.locator("//label[normalize-space()='Status']/parent::div/following-sibling::div/div/div[@role='listbox']/div/span")
        this.addUserEmployeeNameTextbox = page.locator("//label[normalize-space()='Employee Name']/parent::div/following-sibling::div//input")
        this.addUserEmployeeNameSuggestedItems = page.locator("div.oxd-autocomplete-dropdown>div>span")
        this.addUserUsernameTextbox = page.locator("//label[normalize-space()='Username']/parent::div/following-sibling::div/input")
        this.addUserPasswordTextbox = page.locator("//label[normalize-space()='Password']/parent::div/following-sibling::div/input")
        this.addUserConfirmPasswordTextbox = page.locator("//label[normalize-space()='Confirm Password']/parent::div/following-sibling::div/input")
        this.addNewSaveButton = page.locator('button.orangehrm-left-space');

        this.rows = page.locator('.oxd-table-body .oxd-table-row')
        this.cells = page.locator('.oxd-table-body .oxd-table-row .oxd-table-cell div')

        this.deleteIcon = page.locator('button i.bi-trash');
        this.dialogContainer = page.locator('div[role="dialog"] div.oxd-dialog-container-default')
    }

    async addNewUser({ userRole, status, inputText, expectText, username, password }) {
        await this.click(this.addButton);
        await this.formTitle.waitFor({ state: 'visible' });
        await this.selectCustomDropdown(this.addUserUserRoleDropdown, this.addUserUserRoleDropdownItems, userRole);
        await this.selectCustomDropdown(this.addUserStatusDropdown, this.addUserStatusDropdownItems, status);
        await this.searchAndSelectSuggestedItem(this.addUserEmployeeNameTextbox, inputText, this.addUserEmployeeNameSuggestedItems, expectText);
        await this.fill(this.addUserUsernameTextbox, username);
        await this.fill(this.addUserPasswordTextbox, password);
        await this.fill(this.addUserConfirmPasswordTextbox, password);
        await this.click(this.addNewSaveButton);
        await this.notificationHelper.waitForLoadingFired();
    }

    async deleteUser(username) {
        await this.fill(this.addUserUsernameTextbox, username)
        await this.click(this.searchButton)
        await this.notificationHelper.waitForLoadingFired();
        await this.selectDeleteRow(username)
        await this.dialogContainer.waitFor({ state: 'visible', timeout: 3000 });
        const confirmButton = this.dialogContainer.locator('button.oxd-button--label-danger');
        await confirmButton.click();
        await this.notificationHelper.waitForLoadingFired();
    }

    async selectDeleteRow(username) {
        const targetRow = await this.rows.filter({ has: this.page.locator(`.oxd-table-cell div:has-text("${username}")`) })
        const deleteButton = await targetRow.locator('button i.bi-trash')
        await deleteButton.click({ timeout: 3000 });
    }
}
