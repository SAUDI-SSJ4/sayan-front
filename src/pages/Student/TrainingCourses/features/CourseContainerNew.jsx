import React from "react";
import CourseCard from "../components/CourseCard";
import styles from "./CoursesContainer.module.css";
import { Badge } from "flowbite-react";
import { Clock, CalendarDays, CirclePlay } from 'lucide-react';

const CoursesContainerNew = ({ isLoading, courses }) => {
    return (
        <div className={styles.coursesContainer}>
            {isLoading ? (
                <div className={styles.loading}>جاري العرض</div>
            ) : courses.length === 0 ? (
                <div className={styles.noCourses}>لايوجد دورات حالياً</div>
            ) : (
                <div className={styles.courseGrid}>
                    {courses.map((course) => (
                        <>
                            <div className="relative border rounded-2xl h-[33rem]">
                                <div className="absolute top-4 left-4">
                                    {!course.started ? (
                                        <div className="bg-red-600 bg-opacity-50 text-white px-4 py-2 rounded-lg">
                                            ستبدأ قريباً
                                        </div>
                                    ) : (
                                        <div className="absolute flex gap-2 top-2 left-1 text-sm bg-gray-100 w-48 px-4 py-2 rounded-2xl text-blue-700 bg-opacity-90">
                                            <CirclePlay className="text-red-600" /> بدأ البث المباشر منذ 1:55 دقيقة
                                        </div>
                                    )}                                </div>
                                <img className="w-full h-64 object-cover rounded-t-2xl" src={course.image} alt="Course Image" />
                                <div className="mt-6 px-4">
                                    <p className="font-bold text-xl">{course.title}</p>
                                    <div className="flex w-full gap-4">
                                        {course.price === "free" ? (
                                            <Badge size="xl" color="blue">مجاني</Badge>
                                        ) : (
                                            <Badge size="xl" color="success">{course.price} ر.س</Badge>
                                        )}
                                        <Badge size="xl">{course.type}</Badge>
                                    </div>
                                    <div className="flex w-full gap-4 mt-4">
                                        <Badge icon={CalendarDays} size="xl" color="gray">{course.startDate}</Badge>
                                        <Badge icon={Clock} size="xl" color="gray">{course.startTime}</Badge>
                                    </div>
                                    <div className="flex gap-2 mt-4  place-items-center">
                                        <img className="rounded-full w-12 h-12 object-cover" src={course.logo} alt="Academy Logo" />
                                        <div className="h-full pt-3">
                                            <p className="">{course.academy}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoursesContainerNew;





