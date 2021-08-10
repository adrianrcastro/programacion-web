<?php


class Enfermero implements IMiddleware
{

    public function handle($request, Closure $next)
    {
        // TODO: Implement handle() method.
        if(Auth::user()->roles_id == 3)
            return $next($request);
    }
}