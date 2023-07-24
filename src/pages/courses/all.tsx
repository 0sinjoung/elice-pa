import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Chip from "@/components/Chip";
import CourseCard from "@/components/CourseCard";
import Pagination from "@/components/Pagination";
import { PAGE_COUNT, initChip } from "@/constants/index";
import { Courses, OrgCourseListResponses } from "@/constants/types";
import styles from "@/styles/Courses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-debounce";

export default function Courses() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [textFieldValue, setTextFieldValue] = useState("");
  const [chips, setChips] = useState(initChip);
  const [filter, setFilter] = useState("");
  const [courseLists, setCourseLists] = useState<OrgCourseListResponses>();
  const [queryParams, setQueryParams] = useState("count=20&offset=0");
  const [debouncedText] = useDebounce(textFieldValue, 300);

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
    const chips = Array.from(searchParams.getAll("price"));
    const keyword = searchParams.get("keyword");

    // access url -> change chips
    const changeChip = initChip.map((item) => {
      if (chips.includes(item.id.toString())) {
        return { ...item, initPressed: true };
      }
      return item;
    });
    setChips(changeChip);

    // querystring to filter_conditions
    setFilter(
      JSON.stringify({
        $and: [
          { title: `%${keyword}%` },
          {
            $or: chips.map((item) => {
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
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("keyword");
    params.append("keyword", debouncedText);
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedText]);

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
  const handleChangeTextField = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setTextFieldValue(value);
  };

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
            name="text_field"
            className={styles.text_field}
            placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
            onChange={handleChangeTextField}
            value={textFieldValue}
            spellCheck="false"
            autoComplete="off"
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
