import Image from "next/image";
import styles from "@/styles/Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faCalendar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className={styles.contents}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{short_description}</div>
        <div className={styles.icon_box}>
          <ul className={styles.icon_lists}>
            <li className={styles.icon_list}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faChartLine} />
              </span>
              <span>난이도 : 미설정</span>
            </li>
            <li className={styles.icon_list}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faDisplay} />
              </span>
              <span>수업 : 온라인</span>
            </li>
            <li className={styles.icon_list}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <span>기간 : 무제한</span>
            </li>
          </ul>
          <div className={styles.image_box}>
            <Image
              className={styles.logo}
              src={logo_file_url || ""}
              alt="course preview"
              width={52}
              height={52}
              priority
            />
          </div>
        </div>
      </div>
      <div className={styles.label}>
        {enroll_type === 4 ? "구독" : is_free ? "무료" : "유료"}
      </div>
    </article>
  );
}
