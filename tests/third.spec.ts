import { test, expect, Page } from '@playwright/test';


//паттены: "Value Object" и "Steps"

const users = [{ //Value Object
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'mytestemail@mail.ru',
  age: '30',
  salary: '200000',
  department: 'QA'
},
{
  firstName: 'FirstName2',
  lastName: 'LastName2',
  email: 'mytestemail2@mail.ru',
  age: '32',
  salary: '200001',
  department: 'QA2'
}]

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

const fillUserStep = async (user: any, page: Page) => { //Application Action add user
  const webTables = webTablesPage(page);  
  const formDialog = formDialogComponent(page);
  await webTables.clickAddButton();
  await formDialog.fillFirstName(user.firstName);
  await formDialog.fillLastName(user.lastName);
  await formDialog.fillEmail(user.email);
  await formDialog.fillAge(user.age);
  await formDialog.fillSalary(user.salary);
  await formDialog.fillDepartment(user.department);
  await formDialog.clickSubmitButton();
};

const expectUserAction = async (user: any, page: Page) => { //Application Action expect user 
  const webTables = webTablesPage(page);  
  await webTables.expectRowText(user.firstName, `${user.firstName}${user.lastName}${user.age}${user.email}${user.salary}${user.department}`);
};

test('Add user', async ({ page }) => {
  const webTables = webTablesPage(page);

  await webTables.goto();
  await fillUserStep(users[0], page);
  await expectUserAction(users[1], page);
});

test('Delete user', async ({ page }) => {
  const webTables = webTablesPage(page);

  await webTables.goto();
  await webTables.deleteRow('Cierra');
  await webTables.expectRowNotVisible('Cierra');
});

test('Add user with different data', async ({ page }) => {
  const webTables = webTablesPage(page);
  
  await webTables.goto();
  await fillUserStep(users[0], page);
  await expectUserAction(users[0], page);
  await fillUserStep(users[1], page);
  await expectUserAction(users[1], page);
});


