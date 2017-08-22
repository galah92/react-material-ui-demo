import * as THREE from 'three-js/three.js';


// - Global variables -
// Field parameters
var terrainDepthExtents = 100;
var terrainWidth = 128;
var terrainDepth = 128;
var terrainHalfWidth = terrainWidth / 2;
var terrainHalfDepth = terrainDepth / 2;
var terrainMaxHeight = 2;
var terrainMinHeight = 0;
var currTerrainMaxHeight = 0;
var currTerrainMinHeight = 0;

//Threejs variables
var heightData;
var container;
var camera, scene, renderer, controls;
var terrainMesh;
var lut;

// Graphics variables
var colorMap = 'rainbow';
var numberOfColors = 512;

const clipSize = (size) => {
  for (var i = 0; i < size.length; i++) {
    if (size.charAt(i) === 'p') {
      return size.slice(0, i);
    }
  }
};

export const init = (div, data) => {
  // Clear variables
  heightData = null;
  container = null;
  camera = null;
  controls = null;
  lut = null;
  terrainMesh = null;
  scene = null;
  renderer = null;
  terrainWidth = 128;
  terrainDepth = 128;

  heightData = generateHeight( terrainWidth, terrainDepth, terrainMinHeight, terrainMaxHeight );
  container = div;

  initGraphics(container, data);
};

const initGraphics = (container, data) => {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xbfd1e5 );
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio( window.devicePixelRatio );
  const width = clipSize(getComputedStyle(container).width);
  const height = clipSize(getComputedStyle(container).height);
  renderer.setSize( width, height );
  container.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 75, width / height, 0.2, 2000 );
  scene = new THREE.Scene();
  camera.position.y = heightData[ terrainHalfWidth + terrainHalfDepth * terrainWidth ] * ( terrainMaxHeight - terrainMinHeight ) + 5;
  camera.position.z = terrainDepthExtents / 2;
  camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

  controls = new THREE.OrbitControls( camera, container );
  
  var geometry = new THREE.PlaneBufferGeometry( data[0].length, data.length, data[0].length - 1, data.length - 1 );
  geometry.rotateX( -Math.PI / 2 );
  var vertices = geometry.attributes.position.array;
  for ( var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3 ) {
    // j + 1 because it is the y component that we modify
    vertices[ j + 1 ] = heightData[ i ];
  }
  geometry.computeVertexNormals();

  var lutColors = [];
  lut = new THREE.Lut( colorMap, numberOfColors );
  lut.setMax( 20 );
  lut.setMin( 0 );
  for ( i = 0; i < geometry.attributes.position.array.length; i++ ) {
    var colorValue = geometry.attributes.position.array[ i ];
    //console.log(colorValue)
    var color = lut.getColor( colorValue );
    if ( color === undefined ) {
      console.log( "ERROR: " + colorValue );
    } else {
      lutColors[ 3 * i + 0 ] = color.r;
      lutColors[ 3 * i + 1 ] = color.g;
      lutColors[ 3 * i + 2 ] = color.b;
    }
  }
  geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( lutColors ), 3 ) );

  var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xC7C7C7, vertexColors: THREE.VertexColors, side: THREE.DoubleSide } );

  terrainMesh = new THREE.Mesh( geometry, groundMaterial );
  terrainMesh.receiveShadow = true;
  terrainMesh.castShadow = true;
  scene.add( terrainMesh );

  var ambLight = new THREE.AmbientLight( 0xffffff, 0.7 )
  var light = new THREE.DirectionalLight( 0xffffff, 0.5 );  light.position.set( 100, 100, 50 );
  light.castShadow = true;
  var dLight = 200;
  var sLight = dLight * 0.25;
  light.shadow.camera.left = -sLight;
  light.shadow.camera.right = sLight;
  light.shadow.camera.top = sLight;
  light.shadow.camera.bottom = -sLight;
  light.shadow.camera.near = dLight / 30;
  light.shadow.camera.far = dLight;
  light.shadow.mapSize.x = 1024 * 2;
  light.shadow.mapSize.y = 1024 * 2;
  scene.add(light);
  scene.add(ambLight);
  window.addEventListener( 'resize', onWindowResize(), false );
};

const onWindowResize = () => {
  const width = clipSize(getComputedStyle(container).width);
  const height = clipSize(getComputedStyle(container).height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize( width, height );
};

const findMin = (data) => {
    var min = Number.MAX_VALUE;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[0].length; j++) {
            if (data[i][j] < min) {
                min = data[i][j];
            }
        }
    }
    return min;
};

const findMax = (data) => {
    var max = 0.0;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[0].length; j++) {
            if (data[i][j] > max) {
                max = data[i][j];
            }
        }
    }
    return max;
};

const scale = (value, min, max) => {
  if (max === min) {
    return value;
    } else {
        return (20*((value - min) / (max - min)));
    }
};

const generateHeight = (width, depth, minHeight, maxHeight) => {
  // Generates the height data (a sinus wave)
  var size = width * depth;
  var data = new Float32Array(size);
  var p = 0;
  for ( var j = 0; j < depth; j++ ) {
    for ( var i = 0; i < width; i++ ) {
      data[ p ] = 0;
      p++;
    }
  }
  return data;
};

const updateColors= () => {
  var colors = terrainMesh.geometry.attributes.color.array; // Get current color array

  var vertices = terrainMesh.geometry.attributes.position.array;

  for ( var i = 0, j = 0; j < vertices.length; i++, j += 3 ) {
    var colorValue = vertices[ j + 1 ];
    var color = lut.getColor( colorValue );
    if ( color === undefined ) {
      console.log( "ERROR: " + colorValue );
    } else {
      colors[ 3 * i + 0 ] = color.r;
      colors[ 3 * i + 1 ] = color.g;
      colors[ 3 * i + 2 ] = color.b;
    }
  }
};

const updateHeight = (data) => {
  terrainWidth = data[0].length;
  terrainDepth = data.length;
  currTerrainMinHeight = findMin(data);
  currTerrainMaxHeight = findMax(data);
  var p = 0;
  for ( var i = 0; i < data.length; i++ ) {
    for ( var j = 0; j < data[0].length; j++ ) {
      heightData[ p ] = scale(data[data.length - 1 - i][j], currTerrainMinHeight, currTerrainMaxHeight);
      p++;
    }
  }
};

const updateGraph = () => {
  var vertices = terrainMesh.geometry.attributes.position.array;
  for ( var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3 ) {
    // j + 1 because it is the y component that we modify
    vertices[ j+1 ] = heightData[ i ];
  }
};

export const animate = (data) => {
  //requestAnimationFrame(animate);
  updateHeight(data)
  updateGraph();
  updateColors();
  terrainMesh.geometry.attributes.position.needsUpdate = true;
  terrainMesh.geometry.attributes.color.needsUpdate = true;
  render();
};

const render = () => {
  renderer.render( scene, camera );
};
