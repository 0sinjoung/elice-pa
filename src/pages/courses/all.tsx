import Image from "next/image";
import styles from "@/styles/Courses.module.css";
export default function Courses() {
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
        <div className={styles.courses_container}>
          <article className={styles.card}>
            <div className="title"></div>
            <div className="course_contents">내용</div>
            {/* <div className="course_image_box">
              <Image
                className={styles.logo}
                src="/next.svg"
                alt="course preview"
                width={180}
                height={37}
                priority
              />
            </div> */}
          </article>
        </div>
        <div className={styles.pagination}>pagination</div>
      </section>
    </main>
  );
}
