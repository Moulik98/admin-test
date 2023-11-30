import React, { useCallback } from "react";
import Description from "../../Description";
import EyeButton from "./EyeButton";
import { useNavigate } from "react-router-dom";


const AssociateBrandProductTable = ({ brandName, id, list }) => {
    const navigate = useNavigate();

    const handleClick = useCallback((id) => {
        const url = `/marketing-head-dashboard/associate-brands/products/${id}`;
        console.log("url", url);
        // navigate(url);
    }, []);

    if (!list) return <h1 className="text-center my-5">This Brand does not have product</h1>
    return (
        <div className="relative w-full overflow-x-scroll">
            <table className="w-full overflow-x-scroll text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-4 py-2">
                            Sl. No
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Product Title (ID)
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Category Tags
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Utility Tags
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Brand Title
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Action (view)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(list) &&
                        list?.map((brand, brandIndex) => {
                            const { _id, item_name, product_external_id, utility_tags, category_tags } = brand
                            const utilityTag = utility_tags.join(', ')
                            const categoryTag = category_tags.join(', ')
                            return (
                                <tr key={_id}>
                                    <td className="px-4 py-2">{brandIndex + 1}</td>
                                    <td className="px-4 py-2">
                                        {item_name} ({product_external_id})
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-wrap gap-1">
                                            <Description
                                                description={categoryTag}

                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-wrap gap-1">
                                            <Description
                                                description={utilityTag}

                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {brandName}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-x-2 px-4">
                                            <EyeButton
                                                id={_id}
                                                onClick={() => handleClick(_id)}
                                            />

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

export default AssociateBrandProductTable;
