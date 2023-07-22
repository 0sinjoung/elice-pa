import Image from "next/image";
import styles from "@/styles/Courses.module.css";

type Course = {
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
};

export default function CourseCard({ course }): JSX.Element {
  const {
    title,
    short_description,
    class_type,
    enrolled_role_period,
    logo_file_url,
    enroll_type,
    is_free,
  } = course;
  return (
    <article className={styles.card}>
      <div className="title">{title}</div>
      <div className="title">{short_description}</div>
      <div className="title">난이도 {class_type}</div>
      <div className="title">수업 {class_type}</div>
      <div className="title">기간 {enrolled_role_period}</div>
      <div className="course_contents"></div>
      <div className="course_image_box">
        <Image
          className={styles.logo}
          src={logo_file_url || ""}
          alt="course preview"
          width={52}
          height={52}
          priority
        />
      </div>
      <div className="title">
        {enroll_type === 4 ? "구독" : is_free ? "무료" : "유료"}
      </div>
    </article>
  );
}
