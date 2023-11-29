import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getToken } from "../../hook/getToken";

const TagModal = ({ onClose, id, sellerName }) => {
  const [isPending, setIsPending] = useState(false);
  const [tagsData, setTagsData] = useState({
    category_tags: [],
    utility_tags: [],
  });

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        setIsPending(true);
        const url = `${process.env.REACT_APP_URL}/v1/mm/view-tags/${id}`;
        const token = getToken();
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTagsData(data[0] || { category_tags: [], utility_tags: [] });
        } else {
          toast.error("Error fetching tags data");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchTagsData();
  }, [id]);

  const handleDeassign = async () => {
    try {
      setIsPending(true);
      const url = `${process.env.REACT_APP_URL}/v1/mm/edit-tags`;
      const token = getToken();

      const requestBody = {
        utility_tags: tagsData.utility_tags.map((tag) =>
          tag.trim().replace(/^#/, "")
        ),
        category_tags: tagsData.category_tags.map((tag) =>
          tag.trim().replace(/^#/, "")
        ),
        has_variations: tagsData.has_variations, // You may need to adjust this value based on your logic
        product_id: id, // Replace with the actual product ID
        variation_group_id: tagsData.variation_group_id, // Replace with the actual variation group ID
      };
      console.log(requestBody);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success("Tags Updated Successfully");
      } else {
        toast.error("Error updating tags");
      }
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
      setIsPending(false);
    }
  };

  const handleTagEdit = (tagType, newValue) => {
    setTagsData((prevTagsData) => {
      const updatedTagsData = { ...prevTagsData };
      updatedTagsData[tagType] = newValue.split(",");
      return updatedTagsData;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="w-2/5 rounded bg-white ">
        <div className="flex flex-col p-6">
          <p className="font-medium text-gray-900 text-base mt-4">#tags</p>
          <div className="my-4">
            <p className="font-medium text-gray-900 text-base mb-2">
              Category Tags:
            </p>
            <div className="flex items-center">
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTagEdit("category_tags", e.target.innerText)
                }
                dangerouslySetInnerHTML={{
                  __html: `#${tagsData.category_tags.join(", #")}`,
                }}
                className="border border-solid border-gray-300 px-2 py-1 rounded"
              />
            </div>
          </div>
          <div className="my-4">
            <p className="font-medium text-gray-900 text-base mb-2">
              Utility Tags:
            </p>
            <div className="flex items-center">
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTagEdit("utility_tags", e.target.innerText)
                }
                dangerouslySetInnerHTML={{
                  __html: `#${tagsData.utility_tags.join(", #")}`,
                }}
                className="border border-solid border-gray-300 px-2 py-1 rounded"
              />
            </div>
          </div>
          <div className="flex gap-x-5">
            <button
              disabled={isPending}
              onClick={onClose}
              className="py-2 px-14 bg-white text-gray-900 rounded-full border border-solid border-gray-900"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              onClick={handleDeassign}
              className="py-2 px-14 bg-blue-400 text-white rounded-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
