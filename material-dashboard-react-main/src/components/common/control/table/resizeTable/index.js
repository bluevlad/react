import { ConfigProvider, Table } from "antd";
import { ReactComponent as IcEmpty } from "assets/img/ic_information_40px.svg";
import Loading from "components/common/control/loading";
import { useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  const parsedWidth = parseInt(width, 10) || 0; // string으로 입력된 너비 값을 숫자로 파싱하고 파싱에 실패하면 0으로 대체
  // table columns에 width 속성 없으면 resize 안됨
  if (!parsedWidth) {
    return <ResizeCol {...restProps} />;
  }

  return (
    <Resizable
      width={parsedWidth}
      height={0}
      handle={
        <span
          className="react-resizable-handle-e"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: true }}
    >
      <ResizeCol {...restProps} />
    </Resizable>
  );
};

const ResizeTable = (props) => {
  const { t } = useTranslation();
  const [columns, setColumn] = useState(props.columns || []);

  /*
   * columns: array | Table 컴포넌트에 전달될 columns prop
   * dataSource: array | Table 컴포넌트에 전달될 data prop
   * scrollX: number | 테이블 x 스크롤 분기점(크기) 지정
   * scrollY: number | 테이블 y 스크롤 분기점(크기) 지정
   * emptyMsg: string | 테이블에 데이터가 없는 경우 보여질 텍스트
   */

  useEffect(() => {
    // 넓이는 유지하고 변경
    if (props.columns?.length > 0 && props.columns?.length === columns?.length) {
      const updateColumns = props.columns.map((newCol, index) => {
        const existingCol = columns[index];
        return {
          ...newCol,
          width: existingCol?.width || newCol.width, // 기존 너비 유지, 없으면 새 너비 사용
        };
      });
      setColumn(updateColumns);
    } else {
      setColumn(props.columns);
    }
  }, [props.columns, columns]);

  const emptyMsg = () => (
    <div>
      <IcEmpty />
      <p>{props.emptyMsg}</p>
    </div>
  );

  const handleResize =
    (index) =>
    ({ size }) => {
      setColumn((columns) => {
        const nextColumn = [...columns];
        let childrenColumn =
          nextColumn[index].children?.length > 0 ? nextColumn[index].children : null;
        if (childrenColumn) {
          childrenColumn[0] = {
            ...childrenColumn[0],
            width: size.width,
          };
        }
        nextColumn[index] = {
          ...nextColumn[index],
          width: size.width,
        };
        return nextColumn;
      });
    };

  const columnsHeader = [];
  if (columns && columns.length > 0) {
    for (let index = 0; index < columns.length; index++) {
      const col = columns[index];
      columnsHeader.push({
        ...col,
        onHeaderCell: (columns) => ({
          width: columns.width || (columns.title ? columns.title.length : 100),
          onResize: handleResize(index),
          ellipsis: "true",
        }),
      });
    }
  }

  const scroll = {};
  scroll.x = props.scrollX;
  scroll.y = props.scrollY;
  const tableProps = {
    ...props,
    scroll,
    pagination: props.pagination || false,
    tableLayout: "fixed",
  };

  return (
    <ConfigProvider renderEmpty={emptyMsg}>
      <Table
        {...tableProps}
        locale={{
          triggerDesc: t("common.table.tigger.desc"),
          triggerAsc: t("common.table.tigger.asc"),
          cancelSort: t("common.table.cancel.sort"),
        }}
        components={{
          ...props.components,
          header: { cell: ResizableTitle },
        }}
        columns={columnsHeader}
        style={props.style}
        loading={
          props.loading ? { indicator: <Loading loading={props.loading || false} /> } : false
        }
      />
    </ConfigProvider>
  );
};

const ResizeCol = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

ResizableTitle.propTypes = {
  onResize: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ResizeTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  scrollX: PropTypes.number,
  scrollY: PropTypes.number,
  emptyMsg: PropTypes.string,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  components: PropTypes.object,
  style: PropTypes.object,
  loading: PropTypes.bool,
};

export default ResizeTable;
