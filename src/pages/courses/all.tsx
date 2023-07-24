import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Chip from "@/components/Chip";
import CourseCard from "@/components/CourseCard";
import Pagination from "@/components/Pagination";
import styles from "@/styles/Courses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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

const PAGE_COUNT = 20;
const initChip = [
  { id: 26, label: "무료", initPressed: false },
  { id: 27, label: "유료", initPressed: false },
];

export default function Courses() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [chips, setChips] = useState(initChip);
  const [filter, setFilter] = useState("");
  const [courseLists, setCourseLists] = useState<OrgCourseListResponses>();
  const [queryParams, setQueryParams] = useState("count=20&offset=0");

  /* Fetch */
  async function getData() {
    try {
      const data = await fetch(`/api/courses?${queryParams}`).then((res) =>
        res.json()
      );
      setCourseLists(data);
    } catch (err) {
      console.log(err);
    }
  }

  /* Effects */
  useEffect(() => {
    const values = Array.from(searchParams.values());

    // access url -> change chips
    const changeChip = initChip.map((item) => {
      if (values.includes(item.id.toString())) {
        return { ...item, initPressed: true };
      }
      return item;
    });
    setChips(changeChip);

    // querystring to filter_conditions
    setFilter(
      JSON.stringify({
        $and: [
          {
            $or: values.map((item) => {
              if (parseInt(item) === 26) {
                return { enroll_type: 0, is_free: true };
              }
              if (parseInt(item) === 27) {
                return { enroll_type: 0, is_free: false };
              }
              return;
            }),
          },
        ],
      })
    );
  }, [searchParams]);

  useEffect(() => {
    if (!filter) return;
    setQueryParams(`?count=${PAGE_COUNT}&offset=0&filter_conditions=${filter}`);
  }, [filter]);

  useEffect(() => {
    if (!queryParams) return;
    getData();
  }, [queryParams]);

  // if (error) return <div>Failed to load tracks</div>;
  // if (isLoading) return <div>Loading...</div>;
  if (!courseLists) return null;

  /* Event */
  const handlePressChip = (id: string, pressed: boolean) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (pressed) {
      params.append("price", id);
    } else {
      const values = params.getAll("price");
      params.delete("price");
      values.forEach((value) => {
        if (value === id) return;
        params.append("price", value);
      });
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClickPageButton = (changedPage: number): void => {
    const params = new URLSearchParams(queryParams);
    setQueryParams(
      `count=${PAGE_COUNT}&offset=${
        (changedPage - 1) * PAGE_COUNT
      }&filter_conditions=${params.get("filter_conditions")}`
    );
  };

  return (
    <main className={styles.wrap}>
      <section className={`${styles.wrap} ${styles.search}`}>
        <div className={styles.text_search}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            type="text"
            className={styles.text_field}
            placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
          />
        </div>
        <div className={styles.filter_container}>
          <div className={styles.filter_group}>
            <div className={styles.group_label}>가격</div>
            <div className={styles.group_chips}>
              {chips.map((chip) => {
                return (
                  <Chip
                    key={chip.id}
                    id={chip.id}
                    name={chip.id}
                    onPress={handlePressChip}
                    initPressed={chip.initPressed}
                  >
                    {chip.label}
                  </Chip>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.wrap} ${styles.courses}`}>
        <div className={styles.total}>전체 {courseLists.course_count}개</div>
        <div className={styles.courses_container}>
          {courseLists.courses.map((course) => {
            return <CourseCard course={course} key={course.id} />;
          })}
        </div>
        <Pagination
          totalCount={courseLists.course_count}
          countPerPage={PAGE_COUNT}
          handleChangePage={handleClickPageButton}
        />
      </section>
    </main>
  );
}
