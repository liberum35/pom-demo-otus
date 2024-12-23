import { test, expect, Page } from '@playwright/test';

// паттерн "Page(Component) Object Model"

const webTablesPage = (page: Page) => {
  const selectors = {
    addButton: page.getByRole('button', { name: 'Add' }),
    rowLocator: (name: string) => page.locator('.rt-tbody').getByRole('row', { name })
  };

  const actions = {
    goto: async () => {
      await page.goto('https://demoqa.com/webtables/');
    },
    clickAddButton: async () => {
      await selectors.addButton.click();
    },
    deleteRow: async (name: string) => {
      await selectors.rowLocator(name).getByTitle('Delete').click(); 
    },
    expectRowVisible: async (name: string) => {
     await expect(selectors.rowLocator(name)).toBeVisible(); 
   },
    expectRowNotVisible: async (name: string) => {
      await expect(selectors.rowLocator(name)).not.toBeVisible(); 
    },
    expectRowText: async (name: string, text: string) => {  
      await expect(selectors.rowLocator(name)).toHaveText(text); 
    }
  }

  return actions;
};
const formDialogComponent = (page: Page) => {
  const selectors = {
    dialog: page.getByRole('dialog'),
    firstNameInput: page.getByPlaceholder('First Name'),
    lastNameInput: page.getByPlaceholder('Last Name'),
    emailInput: page.getByPlaceholder('name@example.com'),
    ageInput: page.getByPlaceholder('Age'),
    salaryInput: page.getByPlaceholder('Salary'),
    departmentInput: page.getByPlaceholder('Department'),
    submitButton: page.getByRole('button', { name: 'Submit' }),
  };

  const actions = {
    fillFirstName: async (value: string) => {
      await selectors.firstNameInput.fill(value);
    },
    fillLastName: async (value: string) => {
      await selectors.lastNameInput.fill(value);
    },
    fillEmail: async (value: string) => {
      await selectors.emailInput.fill(value);
    },
    fillAge: async (value: string) => {
      await selectors.ageInput.fill(value);
    },
    fillSalary: async (value: string) => {
      await selectors.salaryInput.fill(value);
    },
    fillDepartment: async (value: string) => {
      await selectors.departmentInput.fill(value);
    },
    clickSubmitButton: async () => {
      await selectors.submitButton.click();
    },
    expectDialogVisible: async () => {
      await expect(selectors.dialog).toBeVisible();
    },
    expectDialogNotVisible: async () => {
      await expect(selectors.dialog).not.toBeVisible();
    }
  }

  return actions;
};

test('Add user', async ({ page }) => {
  const webTables = webTablesPage(page);
  const formDialog = formDialogComponent(page);
  
  await webTables.goto();
  await webTables.clickAddButton();
  await formDialog.expectDialogVisible();
  await formDialog.fillFirstName('FirstName');
  await formDialog.fillLastName('LastName');
  await formDialog.fillEmail('mytestemail@mail.ru');
  await formDialog.fillAge('30');
  await formDialog.fillSalary('200000');
  await formDialog.fillDepartment('QA');
  await formDialog.clickSubmitButton();
  await formDialog.expectDialogNotVisible();
  await webTables.expectRowText('FirstName', 'FirstNameLastName30mytestemail@mail.ru200000QA');
});

test('Delete user', async ({ page }) => {
  const webTables = webTablesPage(page);

  await webTables.goto();
  await webTables.deleteRow('Cierra');
  await webTables.expectRowNotVisible('Cierra');
});

test('Add user with different data', async ({ page }) => {
  const webTables = webTablesPage(page);
  const formDialog = formDialogComponent(page);
  
  await webTables.goto();
  await webTables.clickAddButton();
  await formDialog.expectDialogVisible();
  await formDialog.fillFirstName('FirstName');
  await formDialog.fillLastName('LastName');
  await formDialog.fillEmail('mytestemail@mail.ru');
  await formDialog.fillAge('30');
  await formDialog.fillSalary('200000');
  await formDialog.fillDepartment('QA');
  await formDialog.clickSubmitButton();
  await formDialog.expectDialogNotVisible();
  await webTables.expectRowText('FirstName', 'FirstNameLastName30mytestemail@mail.ru200000QA ');
  
  await webTables.clickAddButton();
  await formDialog.expectDialogVisible();
  await formDialog.fillFirstName('FirstName2');
  await formDialog.fillLastName('LastName2');
  await formDialog.fillEmail('mytestemail2@mail.ru');
  await formDialog.fillAge('32');
  await formDialog.fillSalary('200002');
  await formDialog.fillDepartment('QA2');
  await formDialog.clickSubmitButton();
  await formDialog.expectDialogNotVisible();
  await webTables.expectRowText('LastName2', 'FirstName2LastName232mytestemail2@mail.ru200002QA2');


});


