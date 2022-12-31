const suitResources: { [key: string]: string } =
    import.meta.glob('../resource/you_xin/suit*/**/*', {
        eager: true, as: "url",
    });

const suitList = Object.keys(suitResources).reduce((t, key) => {
    const result = key.matchAll(new RegExp('../resource/you_xin/(.*)/(.*)/.*', 'g'));
    const [[_, group, partArmatureName]] = result;

    t.set(`../resource/you_xin/${group}/${partArmatureName}`, partArmatureName);

    return t;
}, new Map<string, string>());

export const resources = Array.from(suitList).map(([path, partArmatureName]) => {
    const bonesJSONUrl = suitResources[`${path}/${partArmatureName}_ske.json`];
    const textureAtlasUrl = suitResources[`${path}/${partArmatureName}_tex.json`];
    const textureUrl = suitResources[`${path}/${partArmatureName}_tex.png`];

    return { bonesJSONUrl, textureAtlasUrl, textureUrl };
});
