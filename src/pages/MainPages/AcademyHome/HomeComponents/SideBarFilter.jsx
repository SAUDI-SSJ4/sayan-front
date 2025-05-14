import React, { useState, useCallback, useMemo } from "react";
import Style from "../home.module.scss";
import Slider from "@mui/material/Slider";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getCategories } from "../../../../utils/apis/client";
import { RadioInput } from "../../../../component/UI/Inputs/RadioInput";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import Button from "@mui/material/Button";

export const SideBarFilter = ({ filterByCategories, minValue, maxValue }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState([minValue, maxValue]);
  const [expanded, setExpanded] = useState([true, true, true]);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await getCategories()).data.allCategories,
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

  const resetFilters = useCallback(() => {
    setPriceRange([minValue, maxValue]);
    setSelectedCategory("all");
    setSelectedType("all");
    filterByCategories([minValue, maxValue], "all", "all");
  }, [filterByCategories, minValue, maxValue]);

  const renderCategories = useMemo(
    () =>
      isLoading ? (
        <div className="mt-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} animation="wave" height={30} style={{ marginBottom: 10 }} />
          ))}
        </div>
      ) : (
        <div className={Style.CategoryList}>
          <div
            className={`${Style.CategoryItem} ${selectedCategory === "all" ? Style.Selected : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            <span className={Style.CategoryName}>جميع الفئات</span>
            <span className={Style.CategoryCount}>{categories.length}</span>
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${Style.CategoryItem} ${selectedCategory === category.id ? Style.Selected : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={Style.CategoryName}>{category.name}</span>
              <span className={Style.CategoryCount}>{category.courses_count || 0}</span>
            </div>
          ))}
        </div>
      ),
    [categories, isLoading, selectedCategory]
  );

  return (
    <motion.div
      className={Style.SidebarFilter}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={Style.FilterHeader}>
        <TuneIcon />
        <h3>تصفية النتائج</h3>
      </div>

      <Accordion expanded={expanded[0]} onChange={() => handleAccordionToggle(0)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={Style.AccordionHeader}>
          <div className={Style.AccordionTitle}>
            <AttachMoneyIcon />
            <span>نطاق السعر</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={Style.PriceSlider}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={minValue}
              max={2500}
              className={Style.CustomSlider}
            />
            <div className={Style.PriceRange}>
              <span>{priceRange[0]} ر.س</span>
              <span>{priceRange[1]} ر.س</span>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded[1]} onChange={() => handleAccordionToggle(1)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={Style.AccordionHeader}>
          <div className={Style.AccordionTitle}>
            <CategoryIcon />
            <span>الفئات</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>{renderCategories}</AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded[2]} onChange={() => handleAccordionToggle(2)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={Style.AccordionHeader}>
          <div className={Style.AccordionTitle}>
            <VideoLibraryIcon />
            <span>نوع الدورة</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={Style.TypeOptions}>
            <RadioInput
              label="جميع الأنواع"
              checked={selectedType === "all"}
              onChange={() => setSelectedType("all")}
            />
            <RadioInput
              label="دورات مسجلة"
              checked={selectedType === "recorded"}
              onChange={() => setSelectedType("recorded")}
            />
            <RadioInput
              label="دورات حضورية"
              checked={selectedType === "attend"}
              onChange={() => setSelectedType("attend")}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <div className={Style.FilterActions}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={applyFilter}
          className={Style.ApplyButton}
        >
          تطبيق الفلتر
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={resetFilters}
          className={Style.ResetButton}
        >
          إعادة ضبط
        </Button>
      </div>
    </motion.div>
  );
};
