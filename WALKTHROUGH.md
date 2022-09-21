# Decentraland Starter tutorial


## Step 1: Clone the demo

```bash
npm install -g decentraland@latest

git clone git@github.com:etiennecadicidean/dcl-starter.git
```

* Open VSCode
* File > Open Folder > Select cloned folder
* Scene description
* Start preview by typing
```bash
dcl start
```

## Step 2: Remove everything from the game.ts


Add a reference to the scene origin
```js
const sceneSize = 16;
const origin = new Vector3(sceneSize/2, 0, sceneSize/2);
```

Add a GLTF 3d model from sources
```js
const eiffelTower = new Entity()
eiffelTower.addComponent(new GLTFShape("models/eiffel_tower.gltf"))

eiffelTower.addComponent(new Transform({ position: origin))
engine.addEntity(eiffelTower);
```

Add a primitive shape with a texture
```js
const bpiPlane = new Entity()

///Shape primitive
bpiPlane.addComponent(new PlaneShape());

///Setup material
const planeMaterial = new Material()
const texture = new Texture("textures/logo_bpi.png");

planeMaterial.albedoTexture = texture
planeMaterial.alphaTexture = texture
planeMaterial.transparencyMode = 1

bpiPlane.addComponent(planeMaterial);
bpiPlane.addComponent(new Transform({ position: origin.add(new Vector3(0, 1, 2)), scale: new Vector3(2, -1, 0.1) }))
engine.addEntity(bpiPlane)
```

Make the plane rotate over the Eiffel Tower
```js
const pivot = new Entity();
pivot.addComponent(new Transform({position: origin}))

engine.addEntity(pivot)
bpiPlane.setParent(pivot)
bpiPlane.addComponent(new Transform({ position: new Vector3(0, 1, 2), scale: new Vector3(2, -1, 0.1) }))

export class RotatorSystem implements ISystem {

  update(dt: number) {
    let transform = pivot.getComponent(Transform);
    transform.rotate(Vector3.Up(), -dt * 50)
  }  
}

engine.addSystem(new RotatorSystem());
```

## Step 4: NFT integration

Look for asset of your choice here https://opensea.io/fr/assets/
```js
const nftEntity = new Entity()

///Add NFT
const shapeComponent = new NFTShape(
  'ethereum://0x495f947276749ce646f68ac8c248420045cb7b5e/86902876787033016230246078766370946898281762830175324487219347329896807399425',
  { color: Color3.Blue(), style: PictureFrameStyle.Gold_Carved }
)

///Add transform
nftEntity.addComponent(shapeComponent)
nftEntity.addComponent(
  new Transform({
    position: origin.add(new Vector3(0, 1.5, -1)), 
    scale: new Vector3(2, 2, 1),
  })
)
engine.addEntity(nftEntity)
```

