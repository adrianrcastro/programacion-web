<?php


class Session implements IMiddleware
{

    public function handle($request, Closure $next)
    {
        // TODO: Implement handle() method.

        if($request->token){
            Auth::setToken($request->token);
            if(Auth::check())
                return $next($request);
        }
    }
}