import Image from "next/image";
import styles from "@/styles/Card.module.css";
import { Course } from "@/constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faCalendar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export default function CourseCard({ course }: Course): JSX.Element {
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
              src={
                logo_file_url ||
                "https://cdn-api.elice.io/api/file/597b9ecbe8fb4cd7ac567d5c9a3f8759/python_02.png?se=2023-08-03T00%3A15%3A00Z&sp=r&sv=2021-12-02&sr=b&sig=YJq/ds8AWcdoKjE/dofHVY1qW2BXcoATgHjsZfkbmzM%3D"
              }
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
