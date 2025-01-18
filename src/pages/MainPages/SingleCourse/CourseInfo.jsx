import React from "react";
import Style from "./SingleCourse.module.scss";
import videotype from "../../../assets/icons/videotype.png";
import examtype from "../../../assets/icons/examtype.png";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../../component/MainPages/FAQ/Accordion";
import classNames from "classnames";

const MotionCard = ({ children, title, additionalClasses = "" }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    transition={{ duration: 1 }}
    className={classNames(Style.Card, additionalClasses)}
  >
    <h2 className={classNames(Style.CardTitle, additionalClasses)}>{title}</h2>
    {children}
  </motion.div>
);

export const CourseInfo = ({ courseData, active, expanded, handleChange }) => {


  const renderContent = () => {
    switch (active) {
      case 0:
        return (
          <MotionCard title="نظرة عامة:" additionalClasses="overview">
            <p>{courseData?.course?.content} </p>
          </MotionCard>
        );
      case 1:
        return (
          <MotionCard title={`عدد الدروس ${courseData?.course?.lessons_count}`} additionalClasses="lessons">
            <div>
              {courseData?.course.categories.map((e, i) => (
                <Accordion
                  key={e.id || i}
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
                >
                  <AccordionSummary aria-controls={`panel${i}-content`} id={`panel${i}-header`}>
                    <p className="fs-6 fw-bold title-text--1">{e.title}</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="fs-6 fw-medium text-content--1">
                      {e.lessons.map((lesson, index) => (
                        <div className={Style.lessons} key={index}>
                          <img
                            src={lesson.type === "video" ? videotype : examtype}
                            alt={lesson.type}
                          />
                          {lesson.title}
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </MotionCard>
        );
      case 2:
        return (
          <MotionCard title="ماذا سوف تتعلم:" additionalClasses="learn">
            <p>{courseData?.course.learn}</p>
          </MotionCard>
        );
      case 3:
        return (
          <MotionCard title="تجربة الطلاب:" additionalClasses="experience">
            <p>Details about student experiences will go here.</p>
          </MotionCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="row mt-2">
      <div className="col-lg-9">
        <AnimatePresence mode="sync">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
};
