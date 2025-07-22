export async function REQ(request: Request) {
  if (request.method != "PUT") {
    return JSON.stringify({
      message: "Put Request not realized",
      status: 404,
    });
  }
}
