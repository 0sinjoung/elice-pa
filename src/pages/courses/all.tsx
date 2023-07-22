import Image from "next/image";
import CourseCard from "@/components/CourseCard";
import styles from "@/styles/Courses.module.css";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
// import CourseCard from '../../components/CourseCard';

type Courses = {
  name: string;
  stargazers_count: number;
};
interface OrgCourseListResponses {
  course_count: number;
  courses: {
    id: number;
    course_type: number;
    tags: string[];
    title: string;
    short_description: string;
    class_type: number;
    logo_file_url: null | string;
    enrolled_role_period: null | string;
    enrolledRoleBeginDatetime: number | null;
    enrolledRoleEndDatetime: number | null;
    beginDatetime: number;
    endDatetime: null | number;
    isDiscounted: boolean;
    discountedPrice: string;
    discountedPriceUsd: string;
    discountRate: null | any;
    price: string;
    priceUsd: string;
    enroll_type: number;
    is_free: boolean;
  }[];
}

export const getServerSideProps: GetServerSideProps<{
  courseLists: OrgCourseListResponses;
}> = async () => {
  const res = await fetch(
    "https://api-rest.elice.io/org/academy/course/list/?sort_by=created_datetime.desc&offset=0&count=20",
    { cache: "no-cache" }
  );
  const courseLists = await res.json();
  return { props: { courseLists } };
};

export default function Courses({
  courseLists,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { course_count, courses } = courseLists;
  return (
    <main className={styles.wrap}>
      <section className={`${styles.wrap} ${styles.search}`}>
        <div className={styles.text_search}>
          <div className={styles.icon}>아이콘</div>
          <input type="text" className={styles.text_field} />
        </div>
        <div className={styles.filter_container}>
          <div className={styles.filter_group}>
            <div className={styles.group_label}>가격</div>
            <div className={styles.group_chips}>칩 영역</div>
          </div>
        </div>
      </section>
      <section className={`${styles.wrap} ${styles.courses}`}>
        <div className={styles.total}>전체 {course_count}개</div>
        <div className={styles.courses_container}>
          {courses.map((course) => {
            return <CourseCard course={course} key={course.id} />;
          })}
        </div>
        <div className={styles.pagination}>pagination</div>
      </section>
    </main>
  );
}
