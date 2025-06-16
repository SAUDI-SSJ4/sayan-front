import Style from "../home.module.scss";
import Slider from "@mui/material/Slider";
// import { Accordion } from "react-bootstrap";
import { Skeleton } from "@mui/material";
import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getCategories } from "../../../../utils/apis/client";
import { RadioInput } from "../../../../component/UI/Inputs/RadioInput";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form } from "react-bootstrap";

export const SideBarFilter = ({ filterByCategories, minValue, maxValue }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState([minValue, maxValue]);
  const [expanded, setExpanded] = useState([true, true, true, true]);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await getCategories();
        return response?.data?.allCategories || [];
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });

  const handleAccordionToggle = useCallback((index) => {
    setExpanded((prev) => prev.map((exp, i) => (i === index ? !exp : exp)));
  }, []);

  const handlePriceChange = useCallback((_, newValue) => setPriceRange(newValue), []);

  const applyFilter = useCallback(() => {
    filterByCategories(priceRange, selectedCategory, selectedType);
  }, [filterByCategories, priceRange, selectedCategory, selectedType]);

  const renderCategories = useMemo(
    () =>
      isLoading ? (
        <div className="mt-4">
          <Skeleton animation="wave" height={20} width="70%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} width="50%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} width="70%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} width="50%" style={{ marginBottom: 6 }} />
        </div>
      ) : (
        categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="form-check d-flex align-items-center mt-2">
              <input
                className={`form-check-input ${Style.InputRadio}`}
                type="checkbox"
                value={category.id}
                id={`category-${category.id}`}
                name="category"
                onChange={() => setSelectedCategory(category.id)}
                checked={selectedCategory === category.id}
              />
              <label
                htmlFor={`category-${category.id}`}
                className={
                  selectedCategory === category.id ? Style.accordionActiveItem : Style.accordionItem
                }
              >
                {category.title}
              </label>
            </div>
          </motion.div>
        ))
      ),
    [categories, isLoading, selectedCategory]
  );

  return (
    <div className={Style.SideBar}>
      <h2>التصفية</h2>
      <div className={Style.Lien} />
      

      <Accordion className={Style} style={{ boxShadow: "none"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <p className={Style.accordionTitle}>التصنيف</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="form-check d-flex align-items-center mt-2">
            <input
              className={`form-check-input ${Style.InputRadio}`}
              type="checkbox"
              value="all"
              id="category-all"
              name="category"
              onChange={() => setSelectedCategory("all")}
              checked={selectedCategory === "all"}
            />
            <label
              htmlFor="category-all"
              className={
                selectedCategory === "all" ? Style.accordionActiveItem : Style.accordionItem
              }
            >
              الكل
            </label>
          </div>
          {renderCategories}
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <p className={Style.accordionTitle}>السعر</p>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            getAriaLabel={() => "Price range"}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={minValue}
            max={maxValue}
          />
          <div className="d-flex gap-2">
            <div>
              <p className={Style.accordionTitle}>من</p>
              <input
                type="number"
                className="form-control"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              />
            </div>
            <div>
              <p className={Style.accordionTitle}>الي</p>
              <input
                type="number"
                className="form-control"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <p className={Style.accordionTitle}>نوع المادة التعليمية</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="form-check d-flex align-items-center mt-2">
            <input
              className="form-check-input"
              type="radio"
              value="all"
              id="type-all"
              name="type"
              onChange={() => setSelectedType("all")}
              checked={selectedType === "all"}
            />
            <label className={Style.accordionItem} htmlFor="type-all">
              الكل
            </label>
          </div>
          <div className="form-check d-flex align-items-center mt-2">
            <input
              className="form-check-input"
              type="radio"
              value="recorded"
              id="type-recorded"
              name="type"
              onChange={() => setSelectedType("recorded")}
              checked={selectedType === "recorded"}
            />
            <label className={Style.accordionItem} htmlFor="type-recorded">
              تفاعلية
            </label>
          </div>
          <div className="form-check d-flex align-items-center mt-2">
            <input
              className="form-check-input"
              type="radio"
              value="live"
              id="type-live"
              name="type"
              onChange={() => setSelectedType("live")}
              checked={selectedType === "live"}
            />
            <label className={Style.accordionItem} htmlFor="type-live">
              مباشرة
            </label>
          </div>
          <div className="form-check d-flex align-items-center mt-2">
            <input
              className="form-check-input"
              type="radio"
              value="attend"
              id="type-attend"
              name="type"
              onChange={() => setSelectedType("attend")}
              checked={selectedType === "attend"}
            />
            <label className={Style.accordionItem} htmlFor="type-attend">
              حضورية
            </label>
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="mt-2">
        <button className={Style.SubmitBtn} onClick={applyFilter}>
          تطبيق
        </button>
      </div>
    </div>
  );
};
