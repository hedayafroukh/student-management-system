export function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

export function loadStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}