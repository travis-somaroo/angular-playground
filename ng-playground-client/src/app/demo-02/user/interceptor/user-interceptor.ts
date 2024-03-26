import { HttpInterceptorFn } from '@angular/common/http';

export const todoRequestInterceptor: HttpInterceptorFn = (req, next) => {
  let newRequest = req;
  // * Only change the request if it is for the user todos
  if (req.url.includes('todos')) {
    // * Build the endpoint URL
    const endpointURL = buildEndPoint(newRequest.url);
    newRequest = req.clone({
      url: endpointURL
    });
    console.log('Endpoint URL', endpointURL);
  }
  return next(newRequest);
};

function buildEndPoint(url: string): string {
  let endPoint = url;
  // * 30% of the time, generate an error
  if (Math.random() < 0.3) {
    // * Generate a 404 error
    endPoint = `https://jsonplaceholder.typicode.com/abc`;
  }
  return endPoint;
}
