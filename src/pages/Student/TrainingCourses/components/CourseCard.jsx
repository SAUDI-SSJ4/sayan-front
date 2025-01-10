import React from 'react'
import styles from './CourseCard.module.css'

const CourseCard = ({ course }) => {
  const getStatusClass = () => {
    switch (course.status) {
      case 'in_progress':
        return styles.statusInProgress
      case 'completed':
        return styles.statusCompleted
      default:
        return styles.statusNotStarted
    }
  }

  return (
    <a className={styles.courseCard} href={`courseDetails/${course.id}`}>
      <h3 className={styles.courseTitle}>{course.title}</h3>
      <p className={styles.courseDescription}>{course.instructor}</p>
      <div className={styles.courseInfo}>
        <div>
          <span>{course.rating}</span>
          <span> • {course.enrolled} طالب</span>
        </div>
        <div>{course.duration}</div>
      </div>
      <div className={styles.courseDetails}>
        <span>{course.level}</span>
        <span>{course.price} ريال</span>
      </div>
    </a>
  )
}

export default CourseCard