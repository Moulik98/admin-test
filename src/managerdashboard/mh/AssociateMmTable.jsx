import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import MergeButton from "./MergeButton";
import EyeButton from "./EyeButton";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../hook/getToken";
import Pagination from "../../Pagination";
import Description from "../../Description";

const AssociateMmTable = ({ cmName, id }) => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const accessToken = getToken();

      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/mh/get-mm-list/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = useCallback((id) => {
    const url = `/category-head-dashboard/associate-seller/${id}`;
    console.log("url", url);
    // navigate(url);
  }, []);

  return (
    <div className="relative w-full overflow-x-scroll">
      <table className="w-full overflow-x-scroll text-left text-xs">
        <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
          <tr>
            <th scope="col" className="px-4 py-2">
              Sl. No
            </th>
            <th scope="col" className="px-4 py-2">
              Brand
            </th>
            <th scope="col" className="px-4 py-2">
              Product Name
            </th>
            <th scope="col" className="px-4 py-2">
              Product ID
            </th>
            <th scope="col" className="px-4 py-2">
              Category Tags
            </th>
            <th scope="col" className="px-4 py-2">
              Utility Tags
            </th>

            <th scope="col" className="px-4 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(apiData) &&
            apiData.map((brand, brandIndex) => {
              const {
                _id: brandId,
                brand_name,
                brand_logo_url,
                products,
              } = brand;

              // Combine product names, external IDs, category tags, and utility tags
              const combinedProductInfo = products.reduce(
                (acc, product, productIndex) => {
                  const {
                    item_name,
                    product_external_id,
                    category_tags,
                    utility_tags,
                  } = product;

                  if (productIndex > 0) {
                    acc.productNames += ",";
                    acc.externalIds.push(", ");
                    acc.categoryTags.push(", ");
                    acc.utilityTags.push(", ");
                  }

                  acc.productNames += item_name;
                  acc.externalIds.push(product_external_id);
                  acc.categoryTags.push(...(category_tags || []));
                  acc.utilityTags.push(...(utility_tags || []));

                  return acc;
                },
                {
                  productNames: "",
                  externalIds: [],
                  categoryTags: [],
                  utilityTags: [],
                }
              );

              return (
                <tr key={brandId}>
                  <td className="px-4 py-2">{brandIndex + 1}</td>
                  <td className="px-4 py-2">
                    <div className="flex">
                      {brand_name}{" "}
                      <img
                        src={brand_logo_url}
                        alt={brand_name}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Description description={combinedProductInfo.productNames}/>
                  </td>
                  <td className="px-4 py-2">
                  <Description description={combinedProductInfo.externalIds.join(",")}/>
                  </td>
                  <td className="px-4 py-2">
                  <Description description={combinedProductInfo.categoryTags.join(",")}/>
                  </td>
                  <td className="px-4 py-2">
                  <Description description={combinedProductInfo.utilityTags.join(",")}/>
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex gap-x-2 px-4">
                      <EyeButton
                        id={brandId}
                        onClick={() => handleClick(brandId)}
                      />
                      {/* Assuming MergeButton requires brandId */}
                      <MergeButton brandId={brandId} />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AssociateMmTable;
