export const postRequest = async (
  url: string,
  body: BodyInit | null | undefined,
  token?: string | null
) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body,
  });
  const result = await response.json();
  return result;
};

export const getRequest = async (url: string, token?: string | null) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error: Error | any) {
    console.error("Failed to fetch:", error);
    return { error: error?.message };
  }
};

export const putRequest = async (
  url: string,
  body: BodyInit | null | undefined,
  token?: string | null
) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Something went wrong");
    }

    return result;
  } catch (error: Error | any) {
    console.error("PUT request failed:", error.message);
    return { success: false, error: error.message || "An error occurred" };
  }
};

export const deleteRequest = async (url: string, token?: string | null) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const result = await response.json();
    return result;
  } catch (error: Error | any) {
    console.error("Delete request failed:", error);
    return { success: false, error: error.message || "An error occurred" };
  }
};

