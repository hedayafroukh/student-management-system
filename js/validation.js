export function validateStudent(studentName, studentId, major, gpa) {
  if (
    studentName.value === "" ||
    studentId.value === "" ||
    major.value === "" ||
    gpa.value === ""
  ) {
    alert("Please fill all fields.");
    return false;
  }

  if (gpa.value < 0 || gpa.value > 4) {
    alert("GPA must be between 0 and 4.");
    return false;
  }
  return true;
}
export function duplicateId(students, studentId) {
  return students.find(function (student) {
    return student.id === studentId.value;
  });
}
