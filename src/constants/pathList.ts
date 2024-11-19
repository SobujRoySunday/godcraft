const pathList=  {
    onlyNoAuthPaths: ['/login'],
    onlyNormalAuthPaths: [],
    onlyAdminAuthPaths: [],
    matcherPaths: ['/dashboard/:path*', '/login']
}

export default pathList;