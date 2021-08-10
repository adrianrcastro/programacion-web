<?php


class Administrador implements IMiddleware
{

    public function handle($request, Closure $next)
    {
        // TODO: Implement handle() method.

        if(Auth::user()->roles_id == 1)
            return $next($request);
    }
}