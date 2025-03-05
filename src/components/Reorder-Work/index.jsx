import axios from "axios";
import { useEffect, useState } from "react";
import ErrorScreen from "@/src/components/Error-Screen/error-screen";
import LoadingScreen from "@/src/components/Loading-Screen/loading-screen";

const ReorderWork = () => {
  const [workList, setWorkList] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //get all works
  useEffect(() => {
    setLoading(true);
    axios
      .get("/work/get/all")
      .then((res) => {
        setWorkList(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  const handleReorder = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= workList.length) return;

    const updatedList = [...workList];
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);

    setWorkList(updatedList);
  };

  const handleSaveOrder = () => {
    const reorderedWorks = workList.map((work, index) => ({
      ...work,
      id: index + 1, // Assign new sequential IDs
    }));

    updateWorkOrder(reorderedWorks);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <div className="reorder-works">
      <h2 className="title">Reorder Works</h2>
      {workList?.map((work, index) => (
        <div key={work.id} className="work">
          <span>{index + 1}.</span>
          <span className="client">{work.client}</span>
          <button onClick={() => handleReorder(index, index - 1)}>▲</button>
          <button onClick={() => handleReorder(index, index + 1)}>▼</button>
        </div>
      ))}
      <button className="save-button" onClick={handleSaveOrder}>
        Save Order
      </button>
    </div>
  );
};

export default ReorderWork;
