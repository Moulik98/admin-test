const getList = async (url, token) => {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err)
    }
}
export default getList;