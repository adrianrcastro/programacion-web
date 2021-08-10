<?php


class AtencionClienteEnfermero implements IMiddleware
{

    public function handle($request, Closure $next)
    {
        // TODO: Implement handle() method.
        if(Auth::user()->roles_id >= 2)
            return $next($request);
    }
}