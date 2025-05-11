import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Box, Stack, Chip, IconButton, Divider, Tooltip, Checkbox } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AreaChart from "../../charts/doubleArea";
import AreaChartNormal from "../../charts/AreaChart";
import { mockUsers } from "../ProductPackagesCard/mock";

// اذا أردت إضافة حالة الطلب بشكل جميل:
const statusMap = {
  active: { label: "تم السحب", color: "#47FFBB", chip: "success" },
  not: { label: "قيد الانتظار", color: "#FFC107", chip: "warning" },
  pending: { label: "قيد التنفيذ", color: "#2196f3", chip: "primary" },
};

const CardStatusChip = ({ status }) => {
  const map = statusMap[status] || statusMap.pending;
  return <Chip label={map.label} sx={{ bgcolor: map.color + "20", color: map.color, fontWeight: 500, fontSize: 15, px: 1.4 }} />;
};

const ProductPackageCard = ({
  item,
  checked,
  onCheck,
  onEdit,
  onDelete,
  onCardClick,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3.8,
        boxShadow: "0 5px 32px 0 rgba(60,96,200,0.06)",
        background: "linear-gradient(125deg,#fff 85%, #f4f7fb 100%)",
        overflow: "hidden",
        p: 0,
        transition: "box-shadow .14s, transform .13s",
        display: "flex",
        flexDirection: "column",
        minHeight: 420,
        cursor: "pointer",
        '&:hover': {
          boxShadow: "0 15px 50px 0 rgba(40, 80, 150, 0.13)",
          transform: "translateY(-3px) scale(1.014)",
        },
      }}
      onClick={onCardClick}
    >
      {/* Top Area - Image & Checkbox */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          alt={item.user?.name}
          image={item.user?.image || "/images/placeholder-user.png"}
          sx={{
            width: "100%",
            height: 225,
            objectFit: "cover",
            borderBottom: "1.9px solid #f2f4fc"
          }}
        />
        <Checkbox
          checked={checked}
          onChange={() => onCheck(item)}
          sx={{
            position: "absolute",
            right: 9,
            top: 9,
            bgcolor: "#fff",
            borderRadius: 2,
            zIndex: 2,
            width: 25, height: 25,
            boxShadow: checked ? "0 2.6px 12px #b7eee4" : "none",
            '&:hover': { bgcolor: "#eef6ff" }
          }}
          onClick={e => e.stopPropagation()}
        />
        {/* تعديل & حذف */}
        <Box sx={{
          position: "absolute", left: 10, top: 10, zIndex: 2, display: "flex", gap: 0.5
        }}>
          <Tooltip title="تعديل">
            <IconButton size="small" sx={{ color: "#1168c7", bgcolor: "#ecf3ff", "&:hover": { bgcolor: "#d6e6ff" } }} onClick={e => { e.stopPropagation(); onEdit(item); }}>
              <BorderColorOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف">
            <IconButton size="small" sx={{ color: "#db1749", bgcolor: "#fde9ee", "&:hover": { bgcolor: "#f9b7c7" } }} onClick={e => { e.stopPropagation(); onDelete(item); }}>
              <DeleteOutlineOutlinedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {/* Content */}
      <CardContent sx={{
        display: "flex", flexDirection: "column", gap: 1.1, flexGrow: 1, pt: 2, pb: 1.1, px: 2.1
      }}>
        {/* اسم المسوق */}
        <Stack direction="row" alignItems="center" gap={1.4}>
          <Typography fontWeight={700} color="primary" fontSize={17} sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.user?.name}
          </Typography>
          <CardStatusChip status={item.isActive} />
        </Stack>
        {/* اكاديمية تعليمية */}
        <Box sx={{ color: "#435", fontWeight: 500, fontSize: 15, my: 0.1 }}>
          الأكاديمية:{" "}
          <Typography component="span" color="#1967d2" sx={{ fontWeight: 600 }}>
            {item.user?.academy || "—"}
          </Typography>
        </Box>
        {/* اعلان ترويجي */}
        <Box sx={{ color: "#727272" }}>
          الإعلان: <span style={{ fontWeight: 600, color: "#318bff" }}>/{item.id}/ad</span>
        </Box>

        {/* المبلغ */}
        <Box sx={{ color: "#1967d2", fontWeight: 800, fontSize: 17, letterSpacing: 0.2 }}>
          {item.amount ? `${item.amount} ر.س.` : "بدون مبلغ"}
        </Box>
        {/* تاريخ الانضمام */}
        <Divider sx={{ my: 0.5, borderColor: "#f5f5f5" }} />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography color="#8a8f9a" sx={{ fontSize: 14 }}>
            انضم: <span style={{ color: "#3d3674" }}>{item.joinedAt || "—"}</span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function ProductPackagesGrid({
  checkAllHandler,
  checkedKeys,
  setData,
  setCheckedKeys
}) {
  const [modal, setModal] = useState({ show: false, targetId: null });
  const [data, setDataState] = useState([]);
  const router = useNavigate();

  useEffect(() => {
    setDataState(mockUsers(8)); // جلب بيانات وهمية/غيّر الداتا حسب الربط
    setData(mockUsers(8));
  }, []);

  // تعامل حذف
  const handleDelete = (item) => setModal({ show: true, targetId: item.id });
  const confirmDelete = () => {
    setModal({ show: false, targetId: null });
    toast.success("تم الحذف بنجاح");
    setDataState(prev => prev.filter(i => i.id !== modal.targetId));
    setData(prev => prev.filter(i => i.id !== modal.targetId));
    setCheckedKeys(prev => prev.filter(i => i.id !== modal.targetId));
  };
  // تعامل الغاء
  const cancelDelete = () => setModal({ show: false, targetId: null });
  // تعامل اختيار الكل
  const checkedAll = checkedKeys.length === data.length && data.length !== 0;
  const handleCheck = (item) => {
    if (!checkedKeys.some((k) => k.id === item.id)) setCheckedKeys((pv) => [...pv, item]);
    else setCheckedKeys((pv) => pv.filter((k) => k.id !== item.id));
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: 18 }}>
      {/* المؤشرات كما هو */}
      <div className="row mb-3 g-3">
        <div className="row p-0 w-100">
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3>معدل رضاء العملاء</h3>
                  <p>93%</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChart />
                </div>
              </div>
              <div className="ChartFooter">
                <div>
                  <FiberManualRecordIcon sx={{ color: "#47FFFF80", width: "20px", height: "20px" }} />
                  90% (راضي)
                </div>
                <div>
                  <FiberManualRecordIcon sx={{ color: "rgba(255, 71, 170, 0.8)", width: "20px", height: "20px" }} />
                  10% (غير راضي)
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3>عدد الطلبات أثناء العروض </h3>
                  <p> 258 طلب</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal color={'rgba(71, 255, 145, 0.1) '} borderColor={'rgba(71, 255, 145, 1)'} />
                </div>
              </div>
              <div className="ChartFooter">
                <div>
                  عرض التقرير
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="chartCard">
              <div className="ChartHeader">
                <div className="ChartText">
                  <h3> المبيعات </h3>
                  <p>5,302 ر.س.</p>
                </div>
                <div className="d-flex align-items-center">
                  <AreaChartNormal color={'rgba(14, 133, 255, 0.1) '} borderColor={'rgba(14, 133, 255, 1)'} />
                </div>
              </div>
              <div className="ChartFooter">
                <div>
                  عرض التقرير
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الشبكة */}
      <Box sx={{ width: "100%", mt: 3 }}>
        <Stack direction="row" alignItems="center" mb={1.6} gap={2}>
          <Checkbox
            checked={checkedAll}
            indeterminate={!checkedAll && checkedKeys.length > 0}
            onChange={checkAllHandler}
            sx={{
              width: 28, height: 28, borderRadius: 2, bgcolor: "#f6f7ff", ml: 1.5,
              '&:hover': { bgcolor: "#eef6ff" }
            }}
          />
          <Typography fontSize={16} fontWeight={600} color="#1967d2">
            تحديد الكل
          </Typography>
        </Stack>
        <Grid container spacing={{ xs: 2, md: 2.7 }}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <ProductPackageCard
                item={item}
                checked={checkedKeys.some((i) => i.id === item.id)}
                onCheck={handleCheck}
                onEdit={() => { /* تعديل */ }}
                onDelete={handleDelete}
                onCardClick={() => { /* توجيه لصفحة الطلب مثلاً */ }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal Bootstrap للحذف */}
      <Modal style={{ direction: "rtl" }} show={modal.show} onHide={cancelDelete} className="modal-student">
        <Modal.Body>
          <h2 style={{ color: "#2B3674", fontSize: "22px" }}> هل تريد حذف هذا الطلب ؟ </h2>
        </Modal.Body>
        <Modal.Footer style={{ direction: "rtl" }}>
          <Button variant="primary" onClick={cancelDelete}> الغاء </Button>
          <Button variant="danger" onClick={confirmDelete}> حذف </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}