let baseUrl = "";
if (process.env.NODE_ENV === "production") {
  baseUrl = "http://yourdomain.com/api/";
} else {
  baseUrl = "http://laravel-books";
}

export const apiHost = baseUrl;
