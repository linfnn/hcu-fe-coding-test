import { useContext, useEffect, useState } from "react";
import ITask from "../../types/task.types";
import api from "../../services/mockAPI";

import { Checkbox, Typography } from "@mui/material";
import { ModalContext } from "../contextAPI";
import { PaginationSection } from "./pagination";
import { AddButton } from "./addBtn";

export const TaskContent = () => {
  const { isReGetting, condition, toggleReGetting, page, toggleModal } =
    useContext(ModalContext);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/tasks", {
          params: {
            search: condition,
            page,
          },
        });
        console.log(res.data);
        setTasks(res.data.data);
        setTotal(res.data.total);
      } catch (error) {
        setTasks([]);
        console.error("Error fetching data:", error);
      } finally {
        toggleReGetting();
      }
    };
    isReGetting && fetchData();
  }, [isReGetting]);

  const handleChangeStatus = async (id: number) => {
    const updateTask = await api.patch(`/tasks/${id}`);
    if (updateTask.status === 200) {
      toggleModal("alert-modal", "Update task successfully");
      toggleReGetting();
    }
  };

  return (
    <div className="px-5 h-[90%] max-[520px]:px-2">
      <ul className="pb-2">
        {tasks?.length ? (
          tasks.map((task, index) => (
            <li key={index}>
              <div className="flex items-center py-2 max-[520px]:py-0">
                <Checkbox
                  checked={task.is_completed}
                  onChange={(e) => handleChangeStatus(parseInt(e.target.value))}
                  value={task.id}
                />
                <div className="text-left pl-2">
                  <Typography variant="h6">{task.title}</Typography>
                  {task.description && (
                    <Typography variant="caption" className="text-gray-500">
                      {task.description}
                    </Typography>
                  )}
                </div>
              </div>
              <hr />
            </li>
          ))
        ) : (
          <li>
            No data
            <hr />
          </li>
        )}
      </ul>
      <PaginationSection total={total} />
      <AddButton />
    </div>
  );
};
