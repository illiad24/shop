import { api } from "./setup";

describe("AUTH FLOW", () => {
  const user = {
    email: "test@test.com",
    password: "123456",
    name: "Test User",
  };

  let accessToken: string;
  let refreshToken: string;

  // =========================
  // REGISTER
  // =========================
  it("POST /auth/register → 201", async () => {
    const res = await api.post("/api/v1/auth/register").send(user);

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(user.email);
  });

  // =========================
  // LOGIN SUCCESS
  // =========================
  it("POST /auth/login → 200 + accessToken + refresh cookie", async () => {
    const res = await api.post("/api/v1/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();

    if (Array.isArray(cookies)) {
      expect(cookies.some((c) => c.includes("refreshToken"))).toBe(true);
    } else {
      expect(cookies).toContain("refreshToken");
    }

    accessToken = res.body.accessToken;
  });
  // -------- ME --------
  it("GET /auth/me → 200 (authorized)", async () => {
    const res = await api
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(user.email);
  });
  // refresh
  it("POST /auth/refresh → 200 (cookie-based)", async () => {
    const res = await api.post("/api/v1/auth/refresh");

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("accessToken");
    expect(typeof res.body.accessToken).toBe("string");

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();

    if (Array.isArray(cookies)) {
      expect(cookies.some((c) => c.includes("refreshToken"))).toBe(true);
    } else {
      expect(cookies).toContain("refreshToken");
    }

    accessToken = res.body.accessToken;
  });

  // =========================
  // LOGOUT
  // =========================
  it("POST /auth/logout → 204 + clear refresh cookie", async () => {
    const res = await api.post("/api/v1/auth/logout");

    expect(res.status).toBe(204);

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();

    if (Array.isArray(cookies)) {
      expect(cookies.some((c) => c.startsWith("refreshToken=;"))).toBe(true);
    } else {
      expect(cookies.startsWith("refreshToken=;")).toBe(true);
    }
  });
});
