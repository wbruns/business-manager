INSERT INTO department (name)
VALUES
    ('Accounting'),
    ('Sales'),
    ('Marketing'),
    ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Receptionist', 40000, 1),
    ('Accountant I', 48000, 1),
    ('Lead Accountant', 55000, 1),
    ('Sales Intern', 30000, 2),
    ('Product Specialist', 47750, 2),
    ('Sales Lead', 56000, 2),
    ('Social Media Rep', 43500, 3),
    ('Advertising Manager', 53250, 3),
    ('Compliance Agent', 44500, 4),
    ('Departmental Relations Manager', 51500, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 3, NULL),
    ('Virginia', 'Woolf', 1, 1),
    ('Piers', 'Gaveston', 2, 1),
    ('Charles', 'LeRoi', 6, NULL),
    ('Katherine', 'Mansfield', 5, 4),
    ('Dora', 'Carrington', 4, 4),
    ('Edward', 'Bellamy', 8, NULL),
    ('Montague', 'Summers', 7, 8),
    ('Octavia', 'Butler', 10, NULL),
    ('Unica', 'Zurn', 9, 9);