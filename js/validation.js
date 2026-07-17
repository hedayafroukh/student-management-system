export function validateStudent(studentName, studentId, major, gpa) {
  if (
    studentName.value.trim() === "" ||
    studentId.value.trim() === "" ||
    major.value === "" ||
    gpa.value === ""
  ) {
    alert("Please fill all fields.");
    return false;
  }
  const studentGpa = Number(gpa.value);
  if (studentGpa < 0 || studentGpa > 4) {
    alert("GPA must be between 0 and 4.");
    return false;
  }
  return true;
}
export function duplicateId(students, studentId, editingId = null) {
  return students.find(function (student) {
    if (editingId !== null && student.id === editingId) {
      return false;
    }
    return student.id === studentId.value;
  });
}
