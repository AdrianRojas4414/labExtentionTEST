import { Project } from "./project.js";
import { ProjectsList } from "./projectList.js";
import { FileProcessor } from "./fileProcessor.js";
import { Commit } from "./commit.js";

describe("Add project", () => {
  let project = new Project("Saludador");
  it("should save 'Saludador' as the name of the project", () => {
    expect(project.getProjectName()).toEqual("Saludador");
  });
});

describe("Add projects", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  it("should save 2 projects with names 'Saludador' and 'Totalizador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Saludador", "Totalizador"]);
  });
});

describe("Delete one project", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  projectslist.projects.pop();
  it("should delete the last project 'Totalizador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Saludador"]);
  });
});

describe("Delete any project", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  projectslist.addProject("Calculador");
  projectslist.deleteProject(0);
  it("should delete the first project 'Saludador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Totalizador", "Calculador"]);
  });
});

describe("Add commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method");
  it("should save a commit with the description 'Added the greet method'", () => {
    expect(project.commitList[0].getCommitDescription()).toEqual("Added the greet method");
  });
});

describe("Add modified lines per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10);

  it("should save 1 commit with description 'Added the greet method' and 10 modified lines", () => {
    const commit = project.commitList[0];
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
  });
});

describe("Add added tests per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10, 2);

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, and 2 added tests", () => {
    const commit = project.commitList[0];
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
  });
});

describe("Add percentage of coverage per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10, 2, 100);

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, and 2 added tests, 100 percentage of coverage", () => {
    const commit = project.commitList[0];
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
  });
});

describe("Add commit date", () => {
  it("should save 1 commit with description 'Added the greet method', 10 modified lines, 2 added tests, 100 percentage of coverage, and date '2021-09-01'", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000);
    const commit = project.commitList[0];

    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
    expect(commit.getCommitDate()).toEqual(new Date(2000, 0, 1));
    expect(commit.getCommitStringDate()).toEqual("1/1/2000");
  });
});

describe("Add commit time", () => {
  it("should save 1 commit with description 'Added the greet method', 10 modified lines, 2 added tests, 100 percentage of coverage, date '2021-09-01', and time '10:30", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30);
    const commit = project.commitList[0];

    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
    expect(commit.getCommitDate()).toEqual(new Date(2000, 0, 1, 10, 30));
    expect(commit.getCommitStringDate()).toEqual("1/1/2000");
    expect(commit.getCommitTimeString()).toEqual("10:30");
  });
});

describe("Add code complexity per commit", () => {
  it("should save 1 commit with description 'Added the greet method', 10 modified lines, 2 added tests, 100 percentage of coverage, date '2021-09-01', time '10:30', and code complexity 'Low'", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    const commit = project.commitList[0];

    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
    expect(commit.getCommitDate()).toEqual(new Date(2000, 0, 1, 10, 30));
    expect(commit.getCommitStringDate()).toEqual("1/1/2000");
    expect(commit.getCommitTimeString()).toEqual("10:30");
    expect(commit.getCodeComplexity().getValue()).toEqual("low");
  });

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, 2 added tests, 100 percentage of coverage, date '2021-09-01', time '10:30', and code complexity 'Moderate'", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "moderate");
    const commit = project.commitList[0];

    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
    expect(commit.getCommitDate()).toEqual(new Date(2000, 0, 1, 10, 30));
    expect(commit.getCommitStringDate()).toEqual("1/1/2000");
    expect(commit.getCommitTimeString()).toEqual("10:30");
    expect(commit.getCodeComplexity().getValue()).toEqual("moderate");
  });

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, 2 added tests, 100 percentage of coverage, date '2021-09-01', time '10:30', and code complexity 'High'", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    const commit = project.commitList[0];

    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
    expect(commit.getCommitDate()).toEqual(new Date(2000, 0, 1, 10, 30));
    expect(commit.getCommitStringDate()).toEqual("1/1/2000");
    expect(commit.getCommitTimeString()).toEqual("10:30");
    expect(commit.getCodeComplexity().getValue()).toEqual("high");
  });

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, 2 added tests, 100 percentage of coverage, date '2021-09-01', time '10:30', and code complexity 'Very high'", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    const commit = project.commitList[0];

    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
    expect(commit.getCommitDate()).toEqual(new Date(2000, 0, 1, 10, 30));
    expect(commit.getCommitStringDate()).toEqual("1/1/2000");
    expect(commit.getCommitTimeString()).toEqual("10:30");
    expect(commit.getCodeComplexity().getValue()).toEqual("veryHigh");
  });
});

describe("Return feedback messages for percentage of coverage per commit", () => {
  it("should return encouraging feedback for the attempt", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getFeedbackMessage()).toEqual("❌ Cobertura de código: ¡Solo el 20% del código está cubierto por pruebas! Es fundamental mejorar drásticamente la cobertura de pruebas para garantizar la calidad y fiabilidad del código. Dedica más tiempo a escribir pruebas exhaustivas antes de escribir el código de producción. ¡Vamos, puedes lograr una cobertura mucho más alta en el siguiente commit!");
  });
  it("should return encouraging feedback for a regular percentage of coverage", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 75);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getFeedbackMessage()).toEqual("🤔 Cobertura de código: 75% del código está cubierto por pruebas. Aunque la cobertura de pruebas es relativamente buena, aún hay espacio para mejorar. Recuerda que al aplicar TDD es importante obtener un porcentaje de cobertura más alto. Escribe más pruebas para cubrir todas las funcionalidades y casos de uso de tu código. Con un poco más de esfuerzo, podrás alcanzar una cobertura más alta.");
  });
  it("should return encouraging feedback for a good percentage of coverage", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 85);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getFeedbackMessage()).toEqual("✔ Cobertura de código: ¡85% del código está cubierto por las pruebas! Continúa manteniendo este nivel de rigurosidad y busca oportunidades para mejorar aún más. ¡Sigue así y alcanzarás una cobertura aún mayor!");
  });
  it("should return encouraging feedback for a excellent percentage of coverage", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 98);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getFeedbackMessage()).toEqual("👏 Cobertura de código: ¡98% del código está cubierto por las pruebas! Continúa aplicando este enfoque riguroso para escribir pruebas antes de escribir el código de producción");
  });
});

describe("Assign points for modified lines per commit", () => {
  it("should assign 0 points for the attempt if the modified lines are equal to 0", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 0, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(0);
  });
  it("should assign 100 points for the attempt if the modified lines are grater than 0 and lower or equal to 35", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 25, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(100);
  });
  it("should assign 70 points for the attempt if the modified lines are grater than 35 and lower or equal to 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 40, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(70);
  });
  it("should assign 10 points for the attempt if the modified lines are grater than 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 60, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(10);
  });
});

describe("Return feedback messages for modified lines per commit", () => {
  it("should return encouraging feedback for the attempt when there was 0 lines modified", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 0, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("❌ Líneas de código modificadas: 0. Debes hacer los cambios necesarios para el ciclo TDD en tu código antes de hacer un commit. No te desanimes. ¡Aplica lo aprendido en la siguiente!");
  });
  it("should return encouraging feedback if the modified lines were grater than 0 and lower or equal to 35", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 15, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("✔ Líneas de código modificadas: 15. El código sufrió pocos cambios. ¡Buen trabajo! ¡Sigue así!");
  });
  it("should return encouraging feedback if the modified lines were grater than 35 and lower or equal to 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 45, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("🤔 Líneas de código modificadas: 45. Muchas líneas de código modificadas para ser un ciclo TDD, debes reducir los cambios que realizas al código en cada ciclo ¡Lo harás mejor en el siguiente commit!");
  });
  it("should return encouraging feedback if the modified lines were grater than 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 55, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("❌ Líneas de código modificadas: 55. Demasiadas líneas de código añadidas. Debes hacer solo los cambios necesarios en cada ciclo de TDD. ¡Vamos, puedes hacerlo mejor y tendrás más puntos!");
  });

  describe("Assign points for added tests", () => {
    it("should assign 100 points for the attempt", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(100);
    });
    it("should assign 100 points for the attempt if the added tests are equal to 0 when message of commit is 'refact: [rest of message]'", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(100);
    });
    it("should assign 0 points for the attempt if the added tests are equal to 1 when message of commit is 'refact: [rest of message]'", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 1, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(0);
    });
    it("should assign 0 points for the attempt if the added tests are more than 0 when message of commit is 'refact: [rest of message]'", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 2, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(0);
    });
    it("should assign 0 points for the attempt if the added tests are equal to 0 when commit isn't for refactoring", () => {
      let project = new Project("Saludador");
      project.addCommit("new function destroyHelloWorld implemented", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(0);
    });
    it("should assign 100 points for the attempt if the added tests are equal to 1 when commit isn't for refactoring", () => {
      let project = new Project("Saludador");
      project.addCommit("new function destroyHelloWorld implemented", 0, 1, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(100);
    });
    it("should assign 10 points for the attempt if the added tests are more than 1 when commit isn't for refactoring", () => {
      let project = new Project("Saludador");
      project.addCommit("new function destroyHelloWorld implemented", 0, 2, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(10);
    });
  });

  describe("Return feedback messages for modified lines per commit", () => {
    it("should return encouraging feedback when is a refactoring commit and the number of addedTests is equal to 0", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: adding functions for best coder reading", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("✔ Cantidad de pruebas añadidas: 0 pruebas nuevas. ☑️Buen trabajo, no se añaden pruebas cuando el código solo es modificado para 'refactoring' 👍");
    });
    it("should return encouraging feedback when is a refactoring commit and the number of addedTests is 1", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: adding functions for best coder reading", 0, 1, 20);
      const commit = project.commitList[0];
      let amountTest = commit.getAddedTests().getValue();
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual(`❌ Cantidad de pruebas añadidas: ${amountTest} prueba/s nueva/s. ⚠️ Recuerda, no se añaden pruebas cuando el código solo es modificado para 'refactoring'`);
    });
    it("should return encouraging feedback when is a refactoring commit and there are tests added", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: adding functions for best coder reading", 0, 2, 20);
      const commit = project.commitList[0];
      let amountTest = commit.getAddedTests().getValue();
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual(`❌ Cantidad de pruebas añadidas: ${amountTest} prueba/s nueva/s. ⚠️ Recuerda, no se añaden pruebas cuando el código solo es modificado para 'refactoring'`);
    });
    it("should return encouraging feedback when is not a refactoring commit and there are not tests added", () => {
      let project = new Project("Saludador");
      project.addCommit("function to destroy 'HelloWorld' added", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("❌ Cantidad de pruebas añadidas: 0 pruebas nuevas. 😨 Para escribir código con TDD no olvides hacer primero las pruebas!!!");
    });
    it("should return encouraging feedback when is not a refactoring commit and there is 1 tests added", () => {
      let project = new Project("Saludador");
      project.addCommit("function to destroy 'HelloWorld' added", 0, 1, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("✔ Cantidad de pruebas añadidas: 1 prueba nueva. ☑️Excelente! No olvides que las pruebas son el alma del TDD 😎");
    });
    it("should return encouraging feedback when is not a refactoring commit and there are more than 1 tests added", () => {
      let project = new Project("Saludador");
      project.addCommit("function to destroy 'HelloWorld' added", 0, 2, 20);
      const commit = project.commitList[0];
      let amountTest = commit.getAddedTests().getValue();
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual(`✔ Cantidad de pruebas añadidas: ${amountTest} pruebas nuevas. 🤔 No hace falta añadir tantas pruebas en un solo ciclo de TDD`);
    });
  });
});

describe("Calculate total points earned per project", () => {
  it("should return points only considering the test coverage metric", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 1, 100);
    project.addCommit("Added the greet method", 200, 2, 30);
    project.addCommit("Added the greet method", 20, 1, 100);
    expect(project.getTotalPointsPerProject()).toEqual(12);
  });
});

describe("Calculate the overall total of points", () => {
  it("should return points of all projects considering only test coverage metric", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.addProject("Totalizador");
    projectslist.addProject("Calculador");
    projectslist.projects[0].addCommit("Added the greet method", 10, 1, 100);
    projectslist.projects[1].addCommit("Added totalizer method", 10, 1, 100);
    projectslist.projects[2].addCommit("Added substracting method", 10, 1, 100);
    expect(projectslist.getTotalPoints()).toEqual(60);
  });
});

describe("Feedback messages for percentage of coverage per project", () => {
  it("should return an a default string if there's no commits in the project", () => {
    let project = new Project("Saludador");
    expect(project.getTestCoverage().getFeedbackMessage()).toEqual("This project has no commits yet.");
  });
  it("should return any feedback if there's one commit in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("Added the greet method", 10, 1, 50);
    const project = projectslist.projects[0];
    expect(project.getTestCoverage().getFeedbackMessage()).toEqual("Deficient");
  });
  it("should return any feedback if there is many commits in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 50);
    project.addCommit("Added the greet method 2", 10, 1, 60);
    expect(project.getTestCoverage().getFeedbackMessage()).toEqual("Deficient");
  });
  it("should return 'Bad' feedback if the average test coverage of all commits in the project is minor to 70", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 20);
    project.addCommit("Added the greet method 2", 10, 1, 40);
    expect(project.getTestCoverage().getFeedbackMessage()).toEqual("Deficient");
  });
  it("should return 'Regular' feedback if the average test coverage of all commits in the project is major or equal to 70 and minor or equal to 79", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 70);
    project.addCommit("Added the greet method 2", 10, 1, 70);
    expect(project.getTestCoverage().getFeedbackMessage()).toEqual("Regular");
  });
  it("should return 'Good' feedback if the average test coverage of all commits in the project is major or equal to 80 and minor or equal to 90", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 90);
    project.addCommit("Added the greet method 2", 10, 1, 90);
    expect(project.getTestCoverage().getFeedbackMessage()).toEqual("Good");
  });
  it("should return 'Excellent' feedback if the average test coverage of all commits in the project is major or equal to 80 and minor or equal to 90", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 95);
    project.addCommit("Added the greet method 2", 10, 1, 100);
    expect(project.getTestCoverage().getFeedbackMessage()).toEqual("Excellent");
  });
});
describe("Points for test coverage per project", () => {
  it("should return 0 points if there's no commits in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    expect(project.getTestCoverage().getPoints()).toEqual(0);
  });
  it("should return points if there is one commit in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 60);
    expect(project.getTestCoverage().getPoints()).toEqual(8);
  });
  it("should return 8 points if the average test coverage of all commits in the project is minor to 70 ", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 60);
    project.addCommit("Added the greet method", 10, 1, 50);
    project.addCommit("Added the greet method", 10, 1, 70);
    expect(project.getTestCoverage().getPoints()).toEqual(8);
  });
  it("should return 12 points if the average test coverage of all commits in the project is major or equal to 70 and minor or equal to 79 ", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 63);
    project.addCommit("Added the greet method", 10, 1, 80);
    project.addCommit("Added the greet method", 10, 1, 70);
    expect(project.getTestCoverage().getPoints()).toEqual(12);
  });
  it("should return 16 points if the average test coverage of all commits in the project is major or equal to 80 and minor or equal to 90", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 90);
    project.addCommit("Added the greet method", 10, 1, 85);
    project.addCommit("Added the greet method", 10, 1, 75);
    project.addCommit("Added the greet method", 10, 1, 95);
    project.addCommit("Added the greet method", 10, 1, 80);
    expect(project.getTestCoverage().getPoints()).toEqual(16);
  });
  it("should return 20 points if the average test coverage of all commits in the project is major to 90", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 1, 90);
    project.addCommit("Added the greet method", 10, 1, 95);
    project.addCommit("Added the greet method", 10, 1, 95);
    project.addCommit("Added the greet method", 10, 1, 100);
    expect(project.getTestCoverage().getPoints()).toEqual(20);
  });
});
describe("Points for test added per commit in project", () => {
  it("should return 0 points in test added per commit if there's no commits in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(0);
  });
  it("should return 20 points in test added per commit if there's a commit in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("new functionality added", 0, 1)
    const project = projectslist.projects[0];
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(20);
  });
  it("should return 8 points in test added per commit if there isn't a commit in the project without at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    const project = projectslist.projects[0];
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(8);
  });
  it("should return 8 points if less of the 60% of the test added per commit doesn't have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    const project = projectslist.projects[0]
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(8);
  });
  it("should return 12 points if less of the 80% and more of the 59% of the test added per commit have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 2, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    const project = projectslist.projects[0]
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(12);
  });
  it("should return 16 points if more of the 79% and less of the 100% of the test added per commit have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 5, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 2, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    const project = projectslist.projects[0]
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(16);
  });
  it("should return 20 points if 100% of the test added per commit have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 5, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 2, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    const project = projectslist.projects[0]
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(20);
  });
  it("should ignore all the commits for refactoing to set the points", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    projectslist.projects[0].addCommit("refact: new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 5, 0)
    projectslist.projects[0].addCommit("refact: new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 2, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("refact: new functionality added", 0, 3, 0)
    const project = projectslist.projects[0]
    expect(project.getAddedTestsPerCommit().getPoints()).toEqual(20);
  });
});
describe("Feedback message for test coverage per project", () => {
  it("should return '(This project has no commits yet.)' in feedback if there aren't commits in project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    expect(project.getAddedTestsPerCommit().getFeedbackMessage()).toEqual("This project has no commits yet.");
  });
  it("should return 'Deficient' in feedback if less of the 60% of the test added per commit doesn't have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    expect(project.getAddedTestsPerCommit().getFeedbackMessage()).toEqual("Deficient");
  });
  it("should return 'Regular' in feedback if more than 59% and less than 80% of the test added per commit have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("refact: new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    expect(project.getAddedTestsPerCommit().getFeedbackMessage()).toEqual("Regular");
  });
  it("should return 'Good' in feedback if more than 79% and less than 100% of the test added per commit have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    projectslist.projects[0].addCommit("new functionality added", 0, 0, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("refact: new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    expect(project.getAddedTestsPerCommit().getFeedbackMessage()).toEqual("Good");
  });
  it("should return 'Excellent' in feedback if more than 79% and less than 100% of the test added per commit have at least one test", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    projectslist.projects[0].addCommit("new functionality added", 0, 2, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("refact: new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 1, 0)
    projectslist.projects[0].addCommit("new functionality added", 0, 3, 0)
    expect(project.getAddedTestsPerCommit().getFeedbackMessage()).toEqual("Excellent");
  });
});
describe("Points for code complexity per project", () => {
  it("should return 0 points if there's no commits in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    expect(project.getCodeComplexity().getPoints()).toEqual(0);
  });
  it("should return points if there is one commit in the project", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    expect(project.getCodeComplexity().getPoints()).toEqual(8);
  });
  it("should return 8 points if the average code complexity of all commits in the project is veryHigh ", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    expect(project.getCodeComplexity().getPoints()).toEqual(8);
  });
  it("should return 12 points if the average code complexity of all commits in the project is high", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "moderate");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    expect(project.getCodeComplexity().getPoints()).toEqual(12);
  });
  it("should return 16 points if the average code complexity of all commits in the project is moderate ", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "moderate");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    expect(project.getCodeComplexity().getPoints()).toEqual(16);
  });
  it("should return 20 points if the average code complexity of all commits in the project is low ", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    expect(project.getCodeComplexity().getPoints()).toEqual(20);
  });
});
describe("Feedback messages for code complexity per project", () => {
  it("should return an a default string if there's no commits in the project", () => {
    let project = new Project("Saludador");
    expect(project.getCodeComplexity().getFeedbackMessage()).toEqual("This project has no commits yet.");
  });
  it("should return any feedback if there's one commit in the project", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    expect(project.getCodeComplexity().getFeedbackMessage()).toEqual("Deficient");
  });
  it("should return 'Deficient' feedback if the average code complexity of all commits in the project is veryHigh", () => {
    let projectslist = new ProjectsList();
    projectslist.addProject("Saludador");
    const project = projectslist.projects[0];
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    expect(project.getCodeComplexity().getFeedbackMessage()).toEqual("Deficient");
  });
  it("should return 'Regular' feedback if the average code complexity of all commits in the project is high", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "moderate");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "veryHigh");
    expect(project.getCodeComplexity().getFeedbackMessage()).toEqual("Regular");
  });
  it("should return 'Good' feedback if the average code complexity of all commits in the project is moderate ", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "moderate");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "high");
    expect(project.getCodeComplexity().getFeedbackMessage()).toEqual("Good");
  });
  it("should return 'Excellent' feedback if the average code complexity of all commits in the project is low ", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30, "low");
    expect(project.getCodeComplexity().getFeedbackMessage()).toEqual("Excellent");
  });
});

describe("Points for code complexity per project", () => {
  it("should assign 0 points when project has no commits yet", () => {
    const project = new Project("Saludador");
    expect(project.getFrecuencyCommit().getPoints()).toEqual(0);
  });
  it("should assign 20 points when there is a commit", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30);
    expect(project.getFrecuencyCommit().getPoints()).toEqual(20);
  });
  it("should assign 20 points when there are two commits and the differece of days is less or equal to  two days", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 2, 1, 2000, 10, 30);
    expect(project.getFrecuencyCommit().getPoints()).toEqual(20);
  });
  it("should assign 20 points when the average in differece of days in commits is less or equal to two days", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 2, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 3, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 4, 1, 2000, 10, 30);
    expect(project.getFrecuencyCommit().getPoints()).toEqual(20);
  });
  it("should assign 16 points when the average in differece of days in commits is more than two days and less or equal to 3 days", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 4, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 7, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 10, 1, 2000, 10, 30);
    expect(project.getFrecuencyCommit().getPoints()).toEqual(16);
  });
  it("should assign 12 points when the average in differece of days in commits is more than 3 days and less or equal to 5 days", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 6, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 11, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 16, 1, 2000, 10, 30);
    expect(project.getFrecuencyCommit().getPoints()).toEqual(12);
  });
  it("should assign 8 points when the average in differece of days in commits is more than 5 days", () => {
    const project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 100, 1, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 7, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 13, 1, 2000, 10, 30);
    project.addCommit("Added the greet method", 10, 2, 100, 19, 1, 2000, 10, 30);
    expect(project.getFrecuencyCommit().getPoints()).toEqual(8);
  });
});
describe("File processor", () => {
  const path = require('path');
  const fs = require('fs');
  let projectsList;
  let fileContent;

  beforeAll(() => {
    const filePath = path.join(__dirname, '../src/commitsTest.txt'); 
    fileContent = fs.readFileSync(filePath, 'utf8');
  });

  it("should receive a file", () => {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], "commitsTest.txt", { type: 'text/plain' });
    const fileProcessor = new FileProcessor(projectsList, file);
    expect(fileProcessor.fileExist()).toEqual(true);
  });
  it("should process file content correctly", () => {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], "commitsTest.txt", { type: 'text/plain' });
    const fileProcessor = new FileProcessor(projectsList, file);
    const dataArray = fileProcessor.processFileContent(fileContent);
    expect(dataArray.length).toBeGreaterThan(19);
  });
});

describe("Change name of a project", () => {
  it("should change the name of a project", () => {
    let project = new Project("Saludador");
    project.changeName("Saludador 2");
    expect(project.getProjectName()).toEqual("Saludador 2");
  });
});


function ProjectF(){

}