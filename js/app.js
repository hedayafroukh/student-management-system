let students = [];

const form = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const major = document.getElementById("major");
const gpa = document.getElementById("gpa");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let student = {
    name: studentName.value,
    id: studentId.value,
    major: major.value,
    gpa: gpa.value,
  };
  students.push(student);
  console.log(students);
  form.reset();
});
