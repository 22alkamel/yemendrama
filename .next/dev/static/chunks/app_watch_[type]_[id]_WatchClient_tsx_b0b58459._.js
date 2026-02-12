(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/watch/[type]/[id]/WatchClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WatchClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function WatchClient({ show, type }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const backendUrl = "http://localhost:8000";
    // جمع كل الحلقات
    const allEpisodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WatchClient.useMemo[allEpisodes]": ()=>{
            const directEpisodes = show.episodes || [];
            const seasonEpisodes = show.seasons?.flatMap({
                "WatchClient.useMemo[allEpisodes]": (season)=>season.episodes
            }["WatchClient.useMemo[allEpisodes]"]) || [];
            return [
                ...directEpisodes,
                ...seasonEpisodes
            ];
        }
    }["WatchClient.useMemo[allEpisodes]"], [
        show
    ]);
    const [currentEpisode, setCurrentEpisode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(allEpisodes[0] || null);
    // جلب كل الأعمال من نفس النوع الدقيق
    const [similarWorks, setSimilarWorks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WatchClient.useEffect": ()=>{
            fetch(`${backendUrl}/api/v1/contents?type=${type}&limit=20`).then({
                "WatchClient.useEffect": (res)=>res.json()
            }["WatchClient.useEffect"]).then({
                "WatchClient.useEffect": (data)=>{
                    // فلترة الأعمال التي تطابق نوع العمل الفعلي فقط
                    const filtered = data.data.filter({
                        "WatchClient.useEffect.filtered": (item)=>item.uuid !== show.uuid && item.type === show.type
                    }["WatchClient.useEffect.filtered"]);
                    setSimilarWorks(filtered);
                }
            }["WatchClient.useEffect"]).catch({
                "WatchClient.useEffect": (err)=>console.error(err)
            }["WatchClient.useEffect"]);
        }
    }["WatchClient.useEffect"], [
        type,
        show.uuid,
        show.type
    ]);
    // حساب عدد الحلقات
    const totalEpisodes = show.seasons?.reduce((total, season)=>total + (season.episodes?.length || 0), 0) || show.episodes?.length || 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "bg-gray-900 min-h-screen text-white mx-auto px-4 py-6",
        children: [
            currentEpisode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-6 relative aspect-video rounded-lg overflow-hidden shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: currentEpisode.video_url || currentEpisode.videoEmbedUrl,
                        title: currentEpisode.title,
                        allowFullScreen: true,
                        className: "w-full h-full"
                    }, void 0, false, {
                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded text-sm",
                        children: currentEpisode.title
                    }, void 0, false, {
                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-300 text-center mt-20",
                children: "الفيديو غير متاح"
            }, void 0, false, {
                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex flex-col lg:flex-row gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold mb-2",
                                children: show.title
                            }, void 0, false, {
                                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-4 text-sm text-gray-300 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "⭐ ",
                                            show.rating ?? "غير متوفر"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "🎬 ",
                                            show.categories?.map((c)=>c.name).join(", ")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "📅 ",
                                            show.year
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this),
                                    show.seasons_count && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "المواسم: ",
                                            show.seasons_count
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                        lineNumber: 80,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mb-12",
                                children: show.description
                            }, void 0, false, {
                                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            allEpisodes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "bg-gray-800 rounded-lg p-4 shadow-lg mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold mb-4",
                                        children: "الحلقات"
                                    }, void 0, false, {
                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-3 max-h-[250px] overflow-y-auto",
                                        children: allEpisodes.map((ep)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                onClick: ()=>setCurrentEpisode(ep),
                                                className: `flex items-center gap-3 p-3 rounded cursor-pointer transition
                      ${currentEpisode?.id === ep.id ? "bg-red-700" : "bg-gray-700 hover:bg-red-600"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: ep.thumbnail || show.poster_image,
                                                        alt: ep.title,
                                                        className: "w-20 h-12 rounded object-cover flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-semibold",
                                                                children: ep.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-300",
                                                                children: ep.duration || "غير محددة"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, ep.id, true, {
                                                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                lineNumber: 90,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:w-[600px] gap-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "bg-gray-800 rounded-lg p-4 shadow-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold mb-4",
                                    children: show.type === "movie" ? "أفلام أخرى" : show.type === "series" ? "مسلسلات أخرى" : show.type === "program" ? "برامج أخرى" : "محتوى مشابه"
                                }, void 0, false, {
                                    fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this),
                                similarWorks.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3 max-h-[600px] overflow-y-auto",
                                    children: similarWorks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            onClick: ()=>router.push(`/watch/${type}/${item.uuid}`),
                                            className: "flex items-center gap-3 p-3 rounded cursor-pointer transition bg-gray-700 hover:bg-red-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: `${backendUrl}${item.card_image || item.poster_image || "/images/default-show.jpg"}`,
                                                    alt: item.title,
                                                    className: "w-20 h-12 rounded object-cover flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold",
                                                            children: item.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                            lineNumber: 139,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-300",
                                                            children: [
                                                                item.categories?.map((c)=>c.name).join(", "),
                                                                " • ",
                                                                item.year
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, item.uuid, true, {
                                            fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                            lineNumber: 128,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-sm",
                                    children: "لا توجد أعمال مشابهة حاليا"
                                }, void 0, false, {
                                    fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/watch/[type]/[id]/WatchClient.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(WatchClient, "J/4pMjpftyrOj2jzwJxaguCHM8E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = WatchClient;
var _c;
__turbopack_context__.k.register(_c, "WatchClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_watch_%5Btype%5D_%5Bid%5D_WatchClient_tsx_b0b58459._.js.map