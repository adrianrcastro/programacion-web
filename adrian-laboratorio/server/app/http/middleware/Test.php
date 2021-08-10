<?php


class Test implements IMiddleware
{

    public function handle($request, Closure $next)
    {
        // TODO: Implement handle() method.

        return $next($request);
    }
}