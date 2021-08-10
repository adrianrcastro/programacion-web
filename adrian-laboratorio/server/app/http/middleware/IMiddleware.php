<?php


interface IMiddleware
{
    public function handle($request, Closure $next);
}