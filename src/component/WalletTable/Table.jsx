import {
  Table,
} from "rsuite";
import React, { useEffect } from "react";

const { Column, HeaderCell, Cell } = Table;

const AmountCell = ({ rowData, dataKey, ...props }) => {
  return <Cell {...props}>{rowData[dataKey]} ر.س</Cell>;
};

const PaymentStatusCell = ({ rowData, ...props }) => {
  const getBadgeClass = (status) => {
    switch (status) {
      case 1:
        return "badge bg-success px-4 py-2";
      case 2:
        return "badge bg-warning px-4 py-2";
      case 3:
        return "badge bg-danger px-4 py-2";
      default:
        return "badge bg-secondary px-4 py-2";
    }
  };

  return (
    <Cell {...props}>
      <span className={getBadgeClass(rowData.payment_status)}>
        {rowData.payment_status === 1 ? "تم" : "معلق"}
      </span>
    </Cell>
  );
};

const WalletTable = ({ data }) => {
  return (
    <div style={{ backgroundColor: "white", padding: "10px" }}>
      <div style={{ overflowX: "auto" }} className="mt-2">
        <Table
          height={600}
          style={{ direction: "rtl" }}
          headerHeight={60}
          rowHeight={60}
          data={data}
          id="table"
        >
          <Column flexGrow={0.5} minWidth={70}>
            <HeaderCell style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700",
            }}>#</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={1} minWidth={150}>
            <HeaderCell style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700",
            }}>المبلغ</HeaderCell>
            <AmountCell dataKey="amount" />
          </Column>

          <Column flexGrow={1} minWidth={150}>
            <HeaderCell style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700",
            }}>النوع</HeaderCell>
            <Cell dataKey="type" />
          </Column>

          <Column flexGrow={1} minWidth={150}>
            <HeaderCell style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700",
            }}>المحتوى</HeaderCell>
            <Cell dataKey="content" />
          </Column>

          <Column flexGrow={1} minWidth={150}>
            <HeaderCell style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700",
            }}>طريقة الدفع</HeaderCell>
            <Cell dataKey="payment_method" />
          </Column>

          <Column flexGrow={1} minWidth={150}>
            <HeaderCell style={{
              paddingBlock: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#2B3674",
              fontWeight: "700",
            }}>حالة الدفع</HeaderCell>
            <PaymentStatusCell />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default WalletTable;
