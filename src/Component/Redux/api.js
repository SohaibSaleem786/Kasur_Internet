const apiLink = "https://crystalsolutions.com.pk/kasurinternet/web/admin/";

export const fetchDataMenu = async (userId) => {
  try {
    const requestBody = new URLSearchParams({ userid: userId }).toString();

    // Send POST request using fetch
    const response = await fetch(`${apiLink}UserMenu.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    // Check if response is successful
    if (!response.ok) {
      console.error(
        `API response failed: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    // Parse the response as JSON
    const data = await response.json();

    console.log("Parsed data:", data);

    // Return the parsed data
    return data;
  } catch (error) {
    // Log and handle any errors
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDataItem = async () => {
  try {
    const response = await fetch(
      `https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchDataCollector = async () => {
  try {
    const response = await fetch(`${apiLink}CollectorList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("CollectorList CollectorList data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataCashAccount = async () => {
  try {
    const response = await fetch(
      `https://crystalsolutions.com.pk/kasurinternet/web/admin/ChartOfAccount.php`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("CollectorList CollectorList data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDataCustomer = async () => {
  try {
    const response = await fetch(`${apiLink}CustomerList.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("CustomerList CustomerList data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchDataAccountCode = async () => {
  try {
    const response = await fetch(`${apiLink}ChartOfAccount.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched item data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
