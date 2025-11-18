import React, { useState } from "react";
// import { Table } from 'antd';
import styled from "styled-components";
import IcDragHandle from "assets/img/ic_move_drag_16px.svg";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { snapCenterToCursor, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DraggableSortRow } from "components/common/control/dragAndDrop";
import ResizeTable from "components/common/control/table/resizeTable";
import PropTypes from "prop-types";

const DragOverlayStyled = styled.div`
  display: flex;
  gap: 8px;
  width: fit-content;
  padding: 12px 16px 12px 36px;
  border: 1px solid var(--primary);
  border-radius: var(--border-radius);
  background: var(--point-light-blue) url(${IcDragHandle}) left 16px center no-repeat;
  color: var(--primary);
  cursor: move;
`;

const SortTable = (props) => {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 10,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = ({ active }) => {
    // console.log('Start', active.id);
    setActiveId(active.id);
  };

  const handleDragEnd = ({ active, over }) => {
    if (active && over && active.id !== over.id) {
      const oldIndex = props.dataSource.findIndex((item) => item.key === active.id);
      const newIndex = props.dataSource.findIndex((item) => item.key === over.id);
      return (
        props.setMoveDataSource &&
        props.setMoveDataSource(arrayMove(props.dataSource, oldIndex, newIndex))
      );
    }
  };

  const Item = () => {
    const activeData = activeId
      ? props.dataSource[
          props.dataSource.findIndex((item) => item[props.datakey || "key"] === activeId)
        ]
      : {};
    return (
      activeData && (
        <DragOverlayStyled>
          {props.columns?.map((item, idx) => (
            <p key={item + idx}>{activeData[item.dataIndex]}</p>
          ))}
        </DragOverlayStyled>
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[snapCenterToCursor, restrictToVerticalAxis]}
      // 충돌
      // 수직수평이동제한
    >
      <SortableContext
        items={props.dataSource.map((i) => i[props.datakey || "key"])}
        strategy={verticalListSortingStrategy}
      >
        <ResizeTable
          components={{ body: { row: DraggableSortRow } }}
          // DraggableRow, approvalOrder
          rowKey={(record) => record[props.datakey || "key"]}
          pagination={false}
          {...props}
        />
      </SortableContext>
      <DragOverlay modifiers={[restrictToVerticalAxis]}>
        {/* snapCenterToCursor : 마우스 포인터에 맞춰서 이동 */}
        {activeId && <Item />}
        {/* <Table
          columns={props.columns || []}
          rowKey={(record) => record[props.datakey || "key"]}
          showHeader={false}
          dataSource={
            activeId
              ? [
                  props.dataSource[
                    props.dataSource.findIndex((item) => item[props.datakey || "key"] === activeId)
                  ],
                ]
              : []
          }
          pagination={false}
        /> */}
      </DragOverlay>
    </DndContext>
  );
};

SortTable.propTypes = {
  dataSource: PropTypes.array,
  setMoveDataSource: PropTypes.func,
  datakey: PropTypes.string,
  columns: PropTypes.array,
};

export default SortTable;
