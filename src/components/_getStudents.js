class Students {
  constructor(data) {
    this.data = data;
  }

  // This gets the total number of students in all or any years.
  _totalStudent(hash) {
    let total = 0;
    for (let key in hash) {
      total += hash[key];
    }
    return total;
  }

  // This gets decimals for percentage calculation.
  _getDecimal(num) {
    return Math.round((num + Number.EPSILON) * 10000) / 100;
  }

  // This filters the number of students of all years by course.
  all() {
    const hash = {};
    for (let r of this.data) {
      hash[r.course] = (hash[r.course] || 0) + 1;
    }
    const total = this._totalStudent(hash);
    const courses = [];
    for (let title in hash) {
      courses.push({
        year: "All",
        title,
        attended: this._getDecimal(hash[title] / total),
      });
    }
    return courses.sort((a, b) => a.title.localeCompare(b.title));
  }

  // This filters the number of students by year && course.
  byCourse(year) {
    const hash = {};
    for (let r of this.data) {
      r.year === year && (hash[r.course] = (hash[r.course] || 0) + 1);
    }
    const total = this._totalStudent(hash);
    const courses = [];
    for (let title in hash) {
      courses.push({
        year,
        title,
        attended: this._getDecimal(hash[title] / total),
      });
    }
    return courses.sort((a, b) => a.title.localeCompare(b.title));
  }

  // This filters the number of students by year && course && instructor.
  byInstructor(year, course) {
    const hash = {};
    let totalStudents = 0;
    if (typeof year === "number") {
      for (let r of this.data) {
        r.year === year &&
          r.course === course &&
          (hash[r.instructor] = (hash[r.instructor] || 0) + 1) &&
          totalStudents++;
      }
    } else {
      for (let r of this.data) {
        r.course === course &&
          (hash[r.instructor] = (hash[r.instructor] || 0) + 1) &&
          totalStudents++;
      }
    }
    const instructors = [];
    for (let instructor in hash) {
      instructors.push({
        year,
        course,
        instructor,
        students: hash[instructor],
        totalStudents,
      });
    }
    return instructors.sort((a, b) => a.instructor.localeCompare(b.instructor));
  }
}

export default Students;
